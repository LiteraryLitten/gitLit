const organizeBookData = (data) => {
  // console.log('organizeBookData');
  // console.log(data);
  // console.log('');
  // console.log('');
  // console.log('');
  const usefulData = {
    year: data.original_publication_year._text,
    month: data.original_publication_month._text,
    day: data.original_publication_day._text,
    title: data.best_book.title._text,
    author: data.best_book.author.name._text,
    averageRating: data.average_rating._text,
  };
  // console.log(usefulData);
  // console.log('');
  // console.log('');
  // console.log('');
  return usefulData;
};

const addReviewData = (reviewData, bookData) => {
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
