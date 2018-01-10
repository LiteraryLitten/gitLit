var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo');
var api = require('../api/apiHelper.js')

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/items', function (req, res) {
  db.selectAllBooks(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/user/:username', (req, res)=> {
  let username = req.params.username
  db.findProfile(username, (err, data)=> {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data[0]);
    }
  })
})

app.get('/book/:isbn', (req, res)=> {

  let isbn = req.params.isbn
  db.findBook(isbn, (err, data)=> {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data[0]);
    }
  })
})

app.get('/search/:title', (req, res)=> {
  let title = req.params.title
  
  db.findBook(title, (err, data)=> {
    if(err) {
      res.sendStatus(500);
    } else {
      api.searchBook(title, (searchResults) => {
        res.json(searchResults)
      })
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
