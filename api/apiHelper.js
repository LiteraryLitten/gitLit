const axios = require('axios');

const convert = require('xml-js');
const { organizeBookData } = require('./apiTest.js');
const { addReviewData } = require('./apiTest.js');
const { goodreadsKey } = require('./goodreads.js');
const { NYTKey } = require('./apiKeys.js');
const param = require('jquery-param');
const $ = require('jquery');

const searchBook = (book, cb) => {
  axios.get('https://www.goodreads.com/search.xml', {
    params: {
      q: book,
      key: goodreadsKey.key,
    },
  })
    .then((response) => {
      const parseRes = convert.xml2json(response.data, { compact: true, spaces: 1 });
      const books = JSON.parse(parseRes).GoodreadsResponse.search.results.work;
      // console.log('books', books[0]);
      cb(null, books[0]);
    })
    .catch((error) => {
      cb(error, null);
      // throw error;
    });
};

const getMoreBookData = (book, cb) => {
  console.log('getting more DATA');
  const id = book.best_book.id._text;
  console.log('id = ', id);
  const url = `https://www.goodreads.com/book/show/${id}?format=xml&key=${goodreadsKey.key}`;
  axios.get(url)
    .then((response) => {
      // I think the parsing is happening after the raw data is passed back
      //* ****

      cb(null, response);
    })
    .catch((error) => {
      // throw error;
      cb(error, null);
    });
};

const getBestSellersBooks = (callback) => {
  let url = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json';
  url += `?${param({ 'api-key': NYTKey.key })}`;
  $.ajax({
    url,
    type: 'GET',
  })
    .done((result) => {
    })
    .fail((err) => {
      throw err;
    });
};

module.exports = {
  searchBook,
  getMoreBookData,
};
