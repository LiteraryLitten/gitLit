const axios = require('axios');
const { goodreadsKey } = require('../api/goodreads.js');
const convert = require('xml-js');
const { organizeBookData } = require('./apiTest.js');
const { addReviewData } = require('./apiTest.js');

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


module.exports = {
  searchBook,
};
