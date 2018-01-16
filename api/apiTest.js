const organizeBookData = (data) => {
  const usefulData = {
    year: data.original_publication_year._text,
    month: data.original_publication_month._text,
    day: data.original_publication_day._text,
    title: data.best_book.title._text,
    author: data.best_book.author.name._text,
    averageRating: data.average_rating._text,
    // isbn10: data.isbn._text,
    isbn13: data.isbn13,
  };

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

const addReviewData2 = (grDataByID) => {
  let isbn13 = 0;
  try {
    isbn13 = grDataByID[3].elements[0].cdata;
  } catch (e) {
    console.log(e);
    return null;
  }

  let year = 0;
  let month = 0;
  let day = 0;
  try {
    year = grDataByID[17].elements[7].elements[0].text;
    month = grDataByID[17].elements[8].elements[0].text;
    day = grDataByID[17].elements[9].elements[0].text;
  } catch (error) {
    try {
      year = grDataByID[10].elements[0].text;
      month = grDataByID[11].elements[0].text;
      day = grDataByID[12].elements[0].text;
    } catch (error) {
      console.log(error);
    }
  }

  let title = '';
  let author = '';
  try {
    title = grDataByID[1].elements[0].cdata;
    author = grDataByID[26].elements[0].elements[1].elements[0].text;
  } catch (error) {
    console.log(error);
  }

  let pages = 0;
  let averageRating = 0;
  try {
    pages = grDataByID[19].elements[0].cdata;
    averageRating = grDataByID[18].elements[0].text;
  } catch (error) {
    console.log(error);
  }

  let description = '';
  try {
    description = grDataByID[16].elements[0].cdata;
  } catch (err) {
    console.log(err);
  }

  let imageURL = '';
  try {
    imageURL = grDataByID[8].elements[0].text;
  } catch (e) {
    console.log(e);
  }

  let popularShelves = [];
  try {
    console.log('');
    console.log(grDataByID[28].elements.map(el => el.attributes.name));
    popularShelves = grDataByID[28].elements.map(el => el.attributes.name);
  } catch (e) {
    console.log(e);
  }

  const usefulData = {
    year,
    month,
    day,
    title,
    author,
    averageRating,
    isbn13,
    pages,
    imageURL,
    // reviewWidget: grDataByID[27].elements,
    description,
    popularShelves,
  };

  return usefulData;
};

module.exports = {
  organizeBookData,
  addReviewData,
  addReviewData2,
};
