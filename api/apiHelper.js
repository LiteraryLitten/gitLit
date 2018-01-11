const axios = require('axios');

const convert = require('xml-js');
const { organizeBookData } = require('./apiTest.js');
const { addReviewData } = require('./apiTest.js');
const { goodreadsKey } = require('./goodreads.js');
const { NYTKey } = require('./apiKeys.js');
const param = require('jquery-param');
const $ = require('jquery');

const searchBook = (book, cb) => {
  //console.log("we are here now in searchbook");
  axios.get('https://www.goodreads.com/search.xml', {
    params: {
      q: book,
      key: goodreadsKey.key,
    },
  })
    .then((response) => {
     // console.log("here on line 20",response.data);
      const parseRes = convert.xml2json(response.data, { compact: true, spaces: 1 });
      const books = JSON.parse(parseRes).GoodreadsResponse.search.results.work;
      let theBook = books;
      if (books.length > 0) {
        theBook = books[0];
      }
      console.log('books', theBook);
      cb(null, theBook);
    })
    .catch((error) => {
      console.log('here on line 20', error);
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
      console.log('apiHelper found data 44:');
      // console.log('getting more Data', response);
      cb(null, response);
    })
    .catch((error) => {
      // throw error;
      cb(error, null);
    });
};

const getBestBooks = (cb) => {
  let url = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json';
  url += `?${param({ 'api-key': NYTKey.key })}`;

  axios.get(url)
    .then((response) => {
      cb(null, response);
    })
    .catch((error) => {
      cb(error, null);
    });
};


module.exports = {
  searchBook,
  getMoreBookData,
  getBestBooks,
};
