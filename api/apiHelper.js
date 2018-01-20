const axios = require('axios');

const convert = require('xml-js');
const { goodReadsKey } = require('./apiKeys.js');
const { NYTKey } = require('./apiKeys.js');
const { iDreambooksKey } = require('./apiKeys.js');
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
      // let theBook = books;
      // if (books.length > 0) {
      //   theBook = books;
      // }
      // console.log('books');// , theBook);
      cb(null, books);
    })
    .catch((error) => {
      console.log('here on line 20');// , error);
      cb(error, null);
    });
};

const getMoreBookData = (book, cb) => {
  // console.log('getting more DATA');
  const id = book.best_book.id._text;
  // console.log('id = ', id);
  // console.log('BOOK', book);
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

const genresWhiteList = ['action and adventure',
  'anthology',
  'art',
  'autobiographies',
  'biographies',
  'biography',
  'business',
  'children\'s',
  'christian',
  'classics',
  'comics',
  'cookbooks',
  'diaries',
  'dictionaries',
  'drama',
  'ebooks',
  'encyclopedias',
  'fantasy',
  'fiction',
  'graphic novels',
  'guide',
  'health',
  'historical fiction',
  'history',
  'horror',
  'journals',
  'lifestyle',
  'math',
  'memoir',
  'motivational',
  'music',
  'mystery',
  'non-fiction',
  'poetry',
  'prayer books',
  'psychology',
  'religion spirituality & new age',
  'romance',
  'satire',
  'science',
  'science fiction',
  'self help',
  'series',
  'sports',
  'thriller',
  'travel',
  'trilogy',
  'young adult'];

const createWordsForPopShelves = (shelvesArray) => {
  // console.log('on line 121 in apiHelper', shelvesArray, shelvesArray.length);
  const newPopShelves = [];
  shelvesArray.forEach((shelf) => {
    const shelfWords = shelf.split('-');
    newPopShelves.push(shelfWords);
  });
  return newPopShelves;
};

const filterByPopularShelves = (book) => {
  const genres = [];
  const popShelvesWithOnlyWords = createWordsForPopShelves(book.popularShelves);
  // console.log('on line 135 in apiHelper', popShelvesWithOnlyWords);
  popShelvesWithOnlyWords.forEach((shelf) => {
    shelf.forEach((word) => {
      if (genresWhiteList.indexOf(word) > -1) {
        if (genres.indexOf(word) === -1) {
          // console.log("here you are word:", word);
          genres.push(word);
        }
      }
    });
  });
  // console.log('on line 150 in apiHelper', genres);
  return genres;
};

const getReviewsiDreams = (isbn, cb) => {
  axios.get(`http://idreambooks.com/api/books/reviews.json?q=${isbn}&key=${iDreambooksKey}`, {
    params: {
      q: isbn,
      key: iDreambooksKey,
    },
  })
    .then((response) => {
      cb(null, response.data);
    })
    .catch((error) => {
      cb(error, null);
    });
};

// const getReviewsiDreams = (isbn, cb) => {
//   axios.get(`http://idreambooks.com/api/books/reviews.json?q=${isbn}&key=${iDreambooksKey}`, {
//     params: {
//       q: isbn, 
//       key: iDreambooksKey,
//     },
//   })
//     .then((response) => {
//       cb(null, response.data);
//     })
//     .catch((error) => {
//       cb(error, null);
//     });
// }

module.exports = {
  searchBook,
  getMoreBookData,
  getBestBooks,
  filterByPopularShelves,
  getReviewsiDreams,
};
