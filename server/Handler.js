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
      } else if (data.length > 0) {
        res.json(data[0]);
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
    api.searchBook(title, (err, searchResults) => {
      if (err) {
        // console.log(err);
        res.sendStatus(500);
      } else {
        // const parsResults = searchResults.map((book) => {
        //   const cleanBook = organizeBookData(book);
        //   return organizeBookData(book);
        // });
        // res.json(parsResults);
        res.json(searchResults);
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
};
