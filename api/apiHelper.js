<<<<<<< HEAD
const axios = require('axios');
const { goodreadsKey } = require('../api/goodreads.js');
const convert = require('xml-js');
const { organizeBookData } = require('./apiTest.js');
const { addReviewData } = require('./apiTest.js');

const searchBook = (book, cb) => {
=======
const goodreads = require('./goodreads.js')
const axios = require('axios')
const {goodreadsKey} = require('./goodreads.js')
const {NYTKey} = require('./apiKeys.js')
const param = require('jquery-param')
const $ = require('jquery')


//**** API search body:
 // q: The query text to match against book title, author, and ISBN fields. Supports boolean operators and phrase searching.
 // page: Which page to return (default 1, optional)
 // key: Developer key (required).
 // search[field]: Field to search, one of 'title', 'author', or 'all' (default is 'all')

//curl "https://www.goodreads.com/search.xml?key=YOUR_KEY&q=Ender%27s+Game"

var searchBook = (book, cb) => {
>>>>>>> Make some changes
  axios.get('https://www.goodreads.com/search.xml', {
    params: {
      q: book,
      key: goodreadsKey.key,
    },
  })
    .then((response) => {
      const parseRes = convert.xml2json(response.data, { compact: true, spaces: 1 });
      const books = JSON.parse(parseRes).GoodreadsResponse.search.results.work;
      const id = books.best_book.id._text;
      const bookData = organizeBookData(books);
      // console.log(bookData);
      // cb(books);
      getMoreBookData(id, (results) => {
        const parRez = convert.xml2json(results.data);
        const jsonRez = JSON.parse(parRez).elements[0].elements[1].elements;
        const updatedData = addReviewData(jsonRez, bookData);
        cb(updatedData);
      });
    })
    .catch((error) => {
      throw error;
    });
};

<<<<<<< HEAD
const getMoreBookData = (id, cb) => {
  const url = `https://www.goodreads.com/book/show/${id}?format=xml&key=${goodreadsKey.key}`;
  axios.get(url)
    .then((response) => {
      cb(response);
    })
    .catch((error) => {
      throw error;
    });
};

=======
var getBestSellersBooks = (callback) => {
  var url = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json";
  url += '?' + param({'api-key': NYTKey.key});
  $.ajax({
    url: url,
    type: 'GET',
    })
    .done(function(result) {
    })
    .fail(function(err) {
        throw err;
    });
  // $.ajax({
  //   url: url,
  //   type: 'GET',
  //   success: (data) => {
  //     console.log("success");
  //   },
  //   error: (err) => {
  //     console.error(err);
  //   }
  // });
}
>>>>>>> Make some changes

module.exports = {
  searchBook,
};
