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

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

var logger = (err, data) => {
  console.log('');
  console.log('');
  console.log(err, data);
}
var user = 'dust_off'

db.findUserFavorites(user, logger);
db.findUserReviews(user, logger)
