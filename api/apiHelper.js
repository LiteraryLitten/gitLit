const axios = require('axios');
const { goodreadsKey } = require('../api/goodreads.js');
const convert = require('xml-js');

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
      const id = books.best_book.id._text;
      cb(books);
    })
    .catch((error) => {
      throw error;
    });
};


module.exports = {
  searchBook,
};
