const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/lit');

const db = mongoose.connection;

// db.dropDatabase();
// mongoose.connect('mongodb://localhost/lit');

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const bookSchema = mongoose.Schema({
  year: String,
  month: String,
  day: String,
  title: String,
  author: String,
  averageRating: String,
  description: String,
  imageURL: String,
  pages: String,
  popularShelves: [String],
  isbn13: String,
  genres: String,
  // reviewWidget: [String]
});

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true
  },
  reviewedBooks: [Number],
  favoriteBooks: [Number],
});

const reviewSchema = new mongoose.Schema({
  idNameNumber: String,
  user: String,
  isbn: Number,
  text: String,
  rating: Number,
});

const Book = mongoose.model('Book', bookSchema);
const User = mongoose.model('User', userSchema);
const Review = mongoose.model('Review', reviewSchema);

const selectAllBooks = (callback) => {
  Book.find({}, (err, items) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

const findUserFavorites = (user, cb) => {
  const books = [];
  User.find({ username: user }).then((foundUser) => {
    const len = foundUser[0].favoriteBooks.length;

    foundUser[0].favoriteBooks.forEach((book) => {
      Book.find({ isbn: book }).then((foundBook) => {
        books.push(foundBook);
      }).then(() => {
        if (books.length === len) {
          cb(books);
        }
      });
    });
  });
};

const findUserReviews = (user, cb) => {
  const reviews = [];
  User.find({ username: user }).then((foundUser) => {
    const len = foundUser[0].reviewedBooks.length;

    foundUser[0].reviewedBooks.forEach((book) => {
      const id = foundUser[0].username + book;
      Review.find({ idNameNumber: id }).then((foundReview) => {
        reviews.push(foundReview);
      }).then(() => {
        if (reviews.length === len) {
          cb(reviews);
        }
      });
    });
  });
};

const findProfile = (user, cb) => {
  User.find({ username: user }).exec(cb);
};

const createProfile = (user) => {
  const newProfile = new User(user);
  newProfile.save();
};

const findBook = (book, cb) => {
  // console.log('findBook is working with:', book);
  const pattern = new RegExp('^\\d{10,13}$');
  if ((book.length === 10 || book.length === 13) && pattern.test(book)) {
    // console.log('its an ISBN?');
    Book.find({ isbn: book }).exec(cb);
  } else {
    Book.find({ title: book }).exec(cb);
  }
};

const save = (bookInfo, genres) => {
  const newBook = new Book({
    year: bookInfo.year,
    month: bookInfo.month,
    day: bookInfo.day,
    title: bookInfo.title,
    author: bookInfo.author,
    averageRating: bookInfo.averageRating,
    description: bookInfo.description,
    imageURL: bookInfo.imageURL,
    pages: bookInfo.pages,
    popularShelves: bookInfo.popularShelves,
    isbn13: bookInfo.isbn13,
    genres: genres,
    // reviewWidget: bookInfo.reviewWidget,
  });
  newBook.save();
};

const findReview = (review, cb) => {
  Review.findOne({ idNameNumber: review }, (err, item) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, item);
    }
  });
};

const saveReview = (review, cb) => {
  const reviewID = `${review.user}${review.isbn13}`;
  findReview(reviewID, (err, data) => {
    if (err) {
      console.log('ERR on Database line 156');
      console.log(err);
      cb(err, null);
    } else if (data) {
      console.log('Success on databae review look up line 160');
      console.log(data);

      if (review.review.length > 0) {
        updatedReview = review.review;
      } else {
        updatedReview = data.text;
      }

      if (review.rating > 0) {
        updatedRating = review.rating;
      } else {
        updatedRating = data.rating;
      }

      Review.update({ idNameNumber: reviewID }, {
        text: updatedReview,
        rating: updatedRating,
      }, (errUpdate, dataUpdate) => {
        cb(errUpdate, dataUpdate);
      });
    } else {
      console.log('NEW', data);
      const newReview = new Review({
        idNameNumber: reviewID,
        user: review.user,
        isbn: review.isbn13,
        text: review.review,
        rating: review.rating,
      });
      newReview.save();
      cb(null, data);
    }
  });
};

module.exports = {
  selectAllBooks,
  findUserFavorites,
  findUserReviews,
  findProfile,
  findBook,
  createProfile,
  save,
  saveReview,
  findReview,
};
