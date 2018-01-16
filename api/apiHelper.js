const axios = require('axios');

const convert = require('xml-js');
const { goodReadsKey } = require('./apiKeys.js');
const { NYTKey } = require('./apiKeys.js');
const apiKeys = require('./apiKeys.js');
const param = require('jquery-param');
const { organizeBookData, addReviewData, addReviewData2 } = require('./apiTest.js');

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


// const getBestBooks = (cb) => {
//   let url = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json';
//   url += `?${param({ 'api-key': NYTKey })}`;
//
//   axios.get(url)
//     .then((response) => {
//       cb(null, response);
//     })
//     .catch((error) => {
//       cb(error, null);
//     });
// };

const getNYT2 = () => {
  let url = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json';
  url += `?${param({ 'api-key': NYTKey })}`;
  return (
    axios.get(url)
  );
};

const getBestBooks = (cb) => {
  getNYT2()
    .then((nytData) => {
      const testISBN13 = [];
      nytData.data.results.forEach((nytBook) => {
        if (nytBook.isbns.length <= 0) { return; }
        const { isbn13 } = nytBook.isbns[0];
        const book = { isbn13 };
        testISBN13.push(isbn13);
      });
      return testISBN13;
    })
    .then(returnArrayOfGrID)
    .then(goodReadsObjFromIDs)
    .then((arrayOfBooks) => {
      cb(arrayOfBooks);
    })
    .catch((err) => {
      console.log('getBestBooks had a problem:', err);
    });
};

const apiGrID = (isbn13) => {
  const url = 'https://www.goodreads.com/book/isbn_to_id';
  return (
    axios.get(url, {
      params: {
        isbn: isbn13,
        key: goodReadsKey,
      },
    })
  );
};

const findGoodIdFromISBN = (collection) => {
  const promises = collection.map(isbn13 => apiGrID(isbn13));
  return Promise.all(promises);
};

const returnArrayOfGrID = (isbnArray) => {
  const arrayGrID = [];
  return new Promise((resolve, reject) => {
    findGoodIdFromISBN(isbnArray)
      .then((data) => {
        data.forEach((grByIsbnReturn) => {
          arrayGrID.push(grByIsbnReturn.data);
        });
        resolve(arrayGrID);
      });
  });
};

const goodReadsObjFromIDs = (goodReadsIdArray) => {
  const bookCollection = [];
  return new Promise((resolve, reject) => {
    goodReadsIdArray.forEach((grId) => {
      bookCollection.push({ grId });
    });
    findGoodData(bookCollection)
      .then((rawData) => {
        const bookObjects = [];
        rawData.forEach((data) => {
          const parRez = convert.xml2json(data.data);
          const jsonRez = JSON.parse(parRez).elements[0].elements[1].elements;
          const parsedData = addReviewData2(jsonRez);
          if (parsedData === null) return;

          const genres = filterByPopularShelves(parsedData);
          parsedData.genres = genres;

          bookObjects.push(parsedData);
        });
        resolve(bookObjects);
      });
  });
};

const apiGrAllData = (grID) => {
  const url = `https://www.goodreads.com/book/show/${grID}?format=xml&key=${goodReadsKey}`;
  return (
    axios.get(url)
  );
};

const findGoodData = (bookArray) => {
  const promises = bookArray.map(book => apiGrAllData(book.grId));
  return Promise.all(promises);
};

// const search3 = (book) => {
//   const { isbn13 } = book.isbns[0];
//   return (
//     axios.get('https://www.goodreads.com/search.xml', {
//       params: {
//         q: isbn13,
//         key: goodReadsKey,
//       },
//     })
//   );
// };

// const searchMap = (books) => {
//   const promises = books.data.results.map((book) => {
//     if (book.isbns.length <= 0) return;
//     return search3(book);
//   });
//   return Promise.all(promises);
// };
//
// const getMoreBookData2 = (book) => {
//   const url = `https://www.goodreads.com/book/show/${book.id}?format=xml&key=${goodReadsKey}`;
//   return (axios.get(url));
// };
//
// const reviewMap = (books) => {
//   const promises = books.map(book => getMoreBookData2(book));
//   return Promise.all(promises);
// };
//
//
// const dataMap = (goodReadsData) => {
//
// };

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

module.exports = {
  searchBook,
  getMoreBookData,
  // getBestBooks,
  filterByPopularShelves,
  // getBestBooks2,
  getBestBooks,
};
