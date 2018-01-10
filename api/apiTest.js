// const axios = require('axios');
// const { goodreadsKey } = require('../api/goodreads.js');

const organizeBookData = (data) => {
  const usefulData = {
    year: data.original_publication_year._text,
    month: data.original_publication_month._text,
    day: data.original_publication_day._text,
    title: data.best_book.title._text,
    // published: `${this.month}-${this.day}-${this.year}`,
    author: data.best_book.author.name._text,
    averageRating: data.average_rating._text,
  };

  return usefulData;
};

const addReviewData = (reviewData, bookData) => {
  // console.log(reviewData);
  bookData.pages = reviewData[19].elements[0].cdata;
  bookData.imageURL = reviewData[8].elements[0].text;
  bookData.reviewWidget = reviewData[27].elements;
  bookData.description = reviewData[16].elements[0].cdata;
  const popularShelves = reviewData[28].elements.map(el => el.attributes.name);
  bookData.popularShelves = popularShelves;
  return bookData;
};

module.exports = {
  organizeBookData,
  addReviewData,
};
