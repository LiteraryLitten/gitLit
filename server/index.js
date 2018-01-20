const express = require('express');
const bodyParser = require('body-parser');
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
app.get('/proreviews/:isbn', handler.getProReviews);
// app.get('/proreviews/:isbn', (req, res) => res.json('hi'));
app.post('/favorites', handler.postFavorites);
app.get('/userReviews/:isbn13', handler.getUserReviews);
app.put('/editprofile', handler.editProfile);
app.get('/reviewShelf/:user', handler.getReviewsByUser);

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
