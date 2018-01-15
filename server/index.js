const express = require('express');
const bodyParser = require('body-parser');
// const convert = require('xml-js');

// const db = require('../database-mongo');
// const api = require('../api/apiHelper.js');
// const { organizeBookData } = require('../api/apiTest.js');
// const { addReviewData } = require('../api/apiTest.js');
const handler = require('./Handler.js');

const app = express();
app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(bodyParser.json());

app.get('/user/:username', handler.getUserByName);
app.post('/login', handler.postLogin);
app.post('/signup', handler.postSignUp);

app.get('/items', handler.getAllBooks);
app.get('/book/:isbn', handler.getBookByISBN);
app.get('/search/:title', handler.getSearchTitle);
app.get('/bestSellers', handler.getBestSellers);
app.post('/review', handler.postReview);

// app.get('/rate/:isbn/:rating', (req, res) => {
//   // !!!!!!!!!!!!!!
//   // get the current loged in user
//   // !!!!!!!!!!!!!!
//   const { isbn } = req.params;
//   const { rating } = req.params;
//   res.json([isbn, rating]);
// });

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
