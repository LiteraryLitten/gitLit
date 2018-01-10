const axios = require('axios');

const convert = require('xml-js');
const { organizeBookData } = require('./apiTest.js');
const { addReviewData } = require('./apiTest.js');
const {goodreadsKey} = require('./goodreads.js')
const {NYTKey} = require('./apiKeys.js')
const param = require('jquery-param')
const $ = require('jquery')

var searchBook = (book, cb) => {
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
}

module.exports = {
  searchBook,
};
