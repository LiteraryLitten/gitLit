const convert = require('xml-js');

const db = require('../database-mongo');
const api = require('../api/apiHelper.js');
const { organizeBookData } = require('../api/apiTest.js');
const { addReviewData } = require('../api/apiTest.js');
const handler = require('./Handler.js');
var bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  getAllBooks: (req, res) => {
    db.selectAllBooks((err, data) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(data);
      }
    });
  },
  getBookByISBN: (req, res) => {
    const { isbn } = req.params;
    db.findBook(isbn, (err, data) => {
      if (err) {
        res.sendStatus(500);
      } else if (data !== null) {
        res.json(data);
      } else {
        api.searchBook(isbn, (errAPI, searchResults) => {
          if (errAPI) {
            res.sendStatus(500);
          } else {
            api.getMoreBookData(searchResults, (error, results) => {
              if (error) {
                res.sendStatus(500);
              } else {
                searchResults.isbn13 = isbn;
                const bookData = organizeBookData(searchResults);
                const parRez = convert.xml2json(results.data);
                const jsonRez = JSON.parse(parRez).elements[0].elements[1].elements;
                const updatedData = addReviewData(jsonRez, bookData);
                const genres = api.filterByPopularShelves(updatedData);
                updatedData.genres = genres;
                db.save(updatedData);
                res.json(updatedData);
              }
            });
          }
        });
      }
    });
  },
  getUserByName: (req, res) => {
    const { username } = req.params;
    db.findProfile(username, (err, data) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(data[0]);
      }
    });
  },
  postLogin: (req, res) => {
    //console.log(" in handler on line 70", req);
    let loginData = {};
    req.on('data', (chunk) => {
      loginData = JSON.parse(chunk.toString());

      // encryption here
      const inputPassword = loginData.password;

      db.findProfile(loginData.username, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          if (data.length === 0) {
            loginData.type = 'invalid username';
          } else {
            bcrypt.compare(inputPassword, data[0].password, function (errCRYPT, resCRYPT) {
              if (errCRYPT) {
                console.log("ERR IN POST LOGIN", errCRYPT);
              } else {
                if (resCRYPT) {
                  loginData.type = 'success';
                  loginData.userProfile = data[0];
                } else {
                  loginData.type = 'wrong password';
                }
              }
              res.json(loginData);
            });
          }
        }
      });
    });
  },
  postSignUp: (req, res) => {
    req.on('data', (chunk) => {
      const userData = JSON.parse(chunk.toString());
      const pw = userData.password;
      const response = {
        type: '',
        data: {},
      };

      // encryption stuff
      bcrypt.hash(pw, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        userData.password = hash;
        // check if exists in database
        db.findProfile(userData.username, (err, data) => {
          if (err) {
            console.log('ERR', err);
          } else if (!data.length) {
            db.createProfile(userData);
            response.type = 'success';
            delete userData.password;
            response.data = userData;
            res.json(response);
          } else {
            response.type = 'error';
            res.json(response);
          }
        });
      });


    });
  },
  getSearchTitle: (req, res) => {
    const { title } = req.params;
    const allBooks = [];
    let count = 0;
    api.searchBook(title, (err, searchResults) => {
      if (err) {
        console.log("ERR IN HANDLER SEARCH BOOK", err);
        res.sendStatus(500);
      } else {
        function callAPI(i, result) {
          api.getMoreBookData(result, (errMore, response) => {
            if (errMore) {
              console.log('err in Handler search book > callAPI');
              count++;
              res.sendStatus(errMore);
            } else {
              // console.log("RESPONSE DATA", response.data);
              const parseRes = convert.xml2json(response.data, { compact: true, spaces: 1 });
              const book = JSON.parse(parseRes).GoodreadsResponse.book;
              // reformat book data
              // const cleanBook = {};
              // console.log(JSON.stringify("BOOK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>", JSON.parse(parseRes)));

              // cleanBook.year = book.publication.year._text;
              // cleanBook.month = book.publication.month._text;
              // cleanBook.title = book.title._cdata;
              // cleanBook.author = book.author.name._text || book.author[0].name._text;
              // cleanBook.averageRating = book.average_rating._text;
              // cleanBook.isbn13 = book.isbn13._cdata;
              // cleanBook.imageURL = book.small_image_url._cdata;
              // cleanBook.description = book.description._cdata;
              // cleanBook.genres = [];

              allBooks[i] = book;
              count ++;
              //console.log(book);
              if(count === searchResults.length - 1) {
                // console.log('IN SEARCH', allBooks);
                res.json(allBooks);
              }
            }
          });
          //do api call (err, data)
            //if err then count ++
          // else allbooks[i](data)
          //cont ++
          //if count === reults.length then do something with the allbooks
        }
        for (let i = 0; i < searchResults.length; i++) {
          callAPI(i, searchResults[i]);
        }

        // if(count === allBooks.length) {
        //   console.log('IN SEARCH', allBooks);
        //   res.json(allBooks);
        // }

        // console.log("IN SEARCH", allBooks);
        // res.json(allBooks);
      }
    });
  },
  getBestSellers: (req, res) => {
    api.getBestBooks((err, data) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(data.data);
      }
    });
  },
  postReview: (req, res) => {
    db.saveReview(req.body, (err, data) => {
      res.json([err, data]);
    });
  },
  getProReviews: (req, res) => {
    api.getReviewsiDreams(req.params.isbn, (err, data) => {
      if (err) {
        res.sendStatus(500);
      } else {
        console.log('lara get request', data.book.critic_reviews);
        res.json(data.book.critic_reviews);
      }
    });
  },
  postFavorites: (req, res) => {
    const { username, isbn13 } = req.params;
    //console.log('on line 223 @ handler.postFavorites-req.params =', username, isbn13); //giving an object with isbn13
    db.saveFavorite(username, isbn13, (err, data) => {
      if (err) {
        res.json(null);
      } else {
      res.json(data);
      }
    });
  },

  getUserReviews: (req, res) => {
    // console.log('');
    const { isbn13 } = req.params;
   // console.log('in getUserReviews @ 177-isbn13=', isbn13);
    db.findReviewsByIsbn13(isbn13, (err, reviews) => {
     // console.log('in getUserReviews @ 179-reviews=', reviews);
      res.json(reviews);
    });
  },
};
