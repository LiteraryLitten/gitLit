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
  if (BEST_SELLSER_ISBN13) {
    const data = {};
    data.data = BEST_SELLSER_ISBN13;
    console.log(data);
    cb(null, data);
  }

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
      console.log('');
      console.log('iDream!!!');
      console.log(response.data);
      console.log('');
      console.log('');

      cb(null, response.data);
    })
    .catch((error) => {
      cb(error, null);
    });
};

const BEST_SELLSER_ISBN13 = [
  9780399169274,
  9780393609394,
  9780735210622,
  9780385514231,
  9780735224292,
  9780451475343,
  9781250130921,
  9780812981605,
  9780805095159,
  9780553447439,
  // 9781595581037,
  9781416580515,
  9781501181825,
  9781501139154,
  9780553448122,
  9780399593482,
  9781501176845,
  9780425284681,
  9780735213180,
  9781501126062,
];

module.exports = {
  searchBook,
  getMoreBookData,
  getBestBooks,
  filterByPopularShelves,
  getReviewsiDreams,
};
