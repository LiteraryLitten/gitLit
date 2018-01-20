const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/lit');


// Heroku options and URI - the xxx is the password - use the env veriables instead
// const options = {
//   server: {
//     socketOptions: {
//       keepAlive: 300000,
//       connectTimeoutMS: 30000,
//     },
//   },
//   replset: {
//     socketOptions: {
//       keepAlive: 300000,
//       connectTimeoutMS: 30000,
//     },
//   },
// };
// const uri = 'mongodb://student:XXX@ds263847.mlab.com:63847/heroku_517m9tk2';
// mongoose.connect(uri);

const db = mongoose.connection;

// Heroku logging
// db.on('error', console.error.bind(console, 'connection error:'));

// db.dropDatabase();
// mongoose.connect('mongodb://localhost/lit');

// db.on('error', () => {
//   console.log('mongoose connection error');
// });
//
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
  proreviews: [Object],
  prorating: Number,
  isbn13: {
    type: Number,
    unique: true,
    required: true,
  },
  goodReadsId: {
    type: Number,
    unique: true,
  },
  genres: [String],
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
  isbn13: Number,
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
  console.log('on line 71 in DB', user);
  const books = [];
  User.find({ username: user }).then((foundUser) => {
    const len = foundUser[0].favoriteBooks.length;
    foundUser[0].favoriteBooks.forEach((book) => {
      console.log(' on line 76', book);
      Book.find({ isbn13: book }).then((foundBook) => {
        console.log('on line 77', foundBook);
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
    // console.log('its an ISBN?', book);
    // Book.findOne({isbn13: `${book}`}).exec((err, results) => {
    //   console.log('findBook @ 121');
    //   console.log('err', err );
    //   console.log('data', results);
    // })
    Book.findOne({ isbn13: `${book}` }).exec(cb);
  } else {
    Book.find({ title: book }).exec(cb);
  }
};

const save = (bookInfo) => {
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
    genres: bookInfo.genres,
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
      // console.log(err);
      cb(err, null);
    } else if (data) {
      console.log('Success on database review look up line 160');
      // console.log(data);
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
        cb(errUpdate, null);
      });
    } else {
      trackUserReviews(review.user, review.isbn13, (userProfile) => {
        console.log('add NEW DB @ 184', 'review');
        const newReview = new Review({
          idNameNumber: reviewID,
          user: review.user,
          isbn13: review.isbn13,
          text: review.review,
          rating: review.rating,
        });
        newReview.save();
        cb(null, userProfile);
      });
    }
  });
};


const trackUserReviews = (user, isbn13, cb) => {
  // update the user.reviewedBooks with the isbn
  // console.log('isbn13:', isbn13);
  let updateReviewedBooks = [];
  User.findOne({ username: `${user}` }).exec((err, userProfile) => {
    if (err) {
      console.log('trackUserReviews had a problem @ db 221');
    } else {
      console.log('on line 218 in trackUserReviews', userProfile);
      updateReviewedBooks = userProfile.reviewedBooks;
      updateReviewedBooks.push(isbn13);
    }
    // console.log('new updateReviewedBooks', updateReviewedBooks);
    User.update({ username: `${user}` }, {
      reviewedBooks: updateReviewedBooks,
    }, (errUpdate, userProfileUpdate) => {
      userProfile.reviewedBooks = updateReviewedBooks;
      // console.log('results @ line 230: user profile = ', userProfile);
      cb(userProfile);
    });
  });
};

const saveFavorite = (userObject, cb) => {
  const { user, isbn13 } = userObject;
  // console.log('on line 201  @ db.saveFavorite', user, isbn13);

  const updatedFavoriteBooks = user.favoriteBooks;
  // console.log('before', updatedFavoriteBooks.length);

  let removed = false;

  if (updatedFavoriteBooks.length > 0) {
    updatedFavoriteBooks.forEach((isbn, index) => {
      // console.log('');
      // console.log('are they equal?:', isbn, isbn13, isbn - isbn13);
      if (isbn - isbn13 === 0) {
        // console.log('then remove it');
        removed = true;
        updatedFavoriteBooks.splice(index, 1);
        // console.log('DURING', updatedFavoriteBooks.length);
      }
    });
    if (!removed) {
      // console.log('   or we could add it');
      updatedFavoriteBooks.push(isbn13);
    }
  } else {
    updatedFavoriteBooks.push(isbn13);
  }

  // console.log('after', updatedFavoriteBooks.length);

  User.update({ username: user }, {
    favoriteBooks: updatedFavoriteBooks,
  }, (errUpdate, dataUpdate) => {
    cb(errUpdate, dataUpdate);
  });
};

const findReviewsByIsbn13 = (isbn13, cb) => {
  Review.find({ isbn13 }).exec((err, reviews) => {
    if (err) {
      console.log('Failed to find reviews');
      cb(err, null);
    }
    if (reviews !== null) {
      console.log('we found a review on db.findReviewsByIsbn13 @ 278', isbn13, reviews);
    } else {
      console.log('NOTHING db.findReviewsByIsbn13 @ 278', isbn13, reviews);
    }
    cb(null, reviews);
  });
};

const editProfile = (currentUser, name, username, cb) => {
  console.log(currentUser);
  User.update({ name: `${currentUser}` }, { name: `${name}`, username: `${username}` }).exec(
    (err, data) => {
      console.log(data);
      cb(err, data);
    });
}

const findReviewsByUser = (user, cb) => {
  Review.find({ user }).exec((err, reviews) => {
    if (err) {
      console.log('Failed to find reviews');
      cb(err, null);
    }
    if (reviews !== null) {
      // console.log('we found a review on db.findReviewsByaUser @ 297', user, reviews);
    } else {
      console.log('NOTHING db.findReviewsByUser @299', user, reviews);
    }
    cb(null, reviews);
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
  saveFavorite,
  findReviewsByIsbn13,
  editProfile,
  findReviewsByUser,
};