const axios = require('axios');

const convert = require('xml-js');
const { goodReadsKey } = require('./apiKeys.js');
const { NYTKey } = require('./apiKeys.js');
const apiKeys = require('./apiKeys.js');
const param = require('jquery-param');

const searchBook = (book, cb) => {
  axios.get('https://www.goodreads.com/search.xml', {
    params: {
      q: book,
      key: goodReadsKey,
    },
  })
    .then((response) => {
      // console.log('here on line 20');// , response.data);
      const parseRes = convert.xml2json(response.data, { compact: true, spaces: 1 });
      const books = JSON.parse(parseRes).GoodreadsResponse.search.results.work;
      let theBook = books;
      if (books.length > 0) {
        theBook = books[0];
      }
      // console.log('books');// , theBook);
      cb(null, theBook);
    })
    .catch((error) => {
      // console.log('here on line 20');// , error);
      cb(error, null);
    });
};

const getMoreBookData = (book, cb) => {
  // console.log('getting more DATA');
  const id = book.best_book.id._text;
  // console.log('id = ', id);
  const url = `https://www.goodreads.com/book/show/${id}?format=xml&key=${goodReadsKey}`;
  axios.get(url)
    .then((response) => {
      // console.log('apiHelper found data 44:');
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
  url += `?${param({ 'api-key': NYTKey })}`;

  axios.get(url)
    .then((response) => {
      cb(null, response);
    })
    .catch((error) => {
      cb(error, null);
    });
};

// iterate through the collection of shelves
// find out whether can search api based on shelf ==> answer is NO.. can find shelves by members
// get a collection of books based on the given shelf
//

// const filterByPopularShelves = (book) => {

//   console.log( " on line 68 in apiHelper", book);
//   // take one shelf and

//   book.popularShelves.forEach(shelf => {
//     //
//   }

// }

module.exports = {
  searchBook,
  getMoreBookData,
  getBestBooks,
};
