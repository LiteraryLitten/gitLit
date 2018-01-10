const axios = require('axios');
const { goodreadsKey } = require('../api/goodreads.js');
const convert = require('xml-js');

const getMoreBookData = (id, cb) => {
  const url = 'https://www.goodreads.com/book/show/5107?format=xml&key=6oijAUTgvAWaektHWXBqkQ';
  // const url = `https://www.goodreads.com/book/show/${id}?format=xml&key=${goodreadsKey.key}`
  axios.get(url)
    .then((response) => {
      console.log('found it');
      // console.log(response);
      cb(response);
    })
    .catch((error) => {
      // throw error;
      console.log('oops');
    });
};

module.exports = {
  getMoreBookData,
};
