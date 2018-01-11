const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo');
const api = require('../api/apiHelper.js');
const { organizeBookData } = require('../api/apiTest.js');
const convert = require('xml-js');
const { addReviewData } = require('../api/apiTest.js');

const app = express();

app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(bodyParser.json());

app.get('/items', (req, res) => {
  db.selectAllBooks((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/user/:username', (req, res) => {
  const { username } = req.params;
  db.findProfile(username, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data[0]);
    }
  });
});

app.post('/user/:username', (req, res) => {
  req.on('data', (chunk) => {
    const userData = JSON.parse(chunk.toString());
    const response = {
      type: '',
      data: {},
    };
    // check if exists in database
    db.findProfile(userData.username, (err, data) => {
      if(err) {
        console.log("ERR", err);
      } else {
    
        if (!data.length) {
          db.createProfile(userData);
          // figure out how to callback this
          response.type = 'success';
          response.data = userData;
          res.json(response);
        } else {
          response.type = 'error';
          res.json(response);
        }
      }
    });
  });
});

app.get('/book/:isbn', (req, res) => {
  const { isbn } = req.params;

  // look in the database for the book
  // works with either a title or an ISBN
  db.findBook(isbn, (errDB, data) => {
    if (errDB) {
      res.sendStatus(500);
    } else if (data.length > 0) {
      res.json(data[0]);
    } else {
      api.searchBook(isbn, (errAPI, searchResults) => {
        if (errAPI) {
          // console.log('ERROR');
          res.sendStatus(500);
        } else {
          // console.log('ELSE FOUND');
          api.getMoreBookData(searchResults, (error, results) => {
            if (errAPI) {
              // console.log('ERROR');
              res.sendStatus(500);
            } else {
              // console.log('CB for more DATA');
              const bookData = organizeBookData(searchResults);
              const parRez = convert.xml2json(results.data);
              const jsonRez = JSON.parse(parRez).elements[0].elements[1].elements;
              const updatedData = addReviewData(jsonRez, bookData);

              res.json(updatedData);
            }
          });
        }
      });
    }
  });
});


app.get('/search/:title', (req, res) => {
  const { title } = req.params;
  api.searchBook(title, (err, searchResults) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const parsResults = searchResults.map((book) => {
        const cleanBook = organizeBookData(book);
        // db.save(cleanBook)
        return organizeBookData(book);
      });
      // use the parse function to create more readable database
      // build a 'save' function to add it to the db
      // the save function need to check for 'extra' data and then fetch it
      // );
      res.json(parsResults);
    }
  });
});

app.get('/bestSellers', (req, res) => {
  console.log('on line 58 in server');
  api.getBestSellersBooks((err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
