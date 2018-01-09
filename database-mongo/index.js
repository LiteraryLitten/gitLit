var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lit');

var db = mongoose.connection;

// db.dropDatabase();
// mongoose.connect('mongodb://localhost/lit');

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var bookSchema = mongoose.Schema({
  title: String,
  author: String,
  genres: [String],
  isbn: Number,
  url: String,
  reviews: [Number],
});

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        // required: true
    },
    reviewedBooks: [Number],
    favoriteBooks: [Number]
});

const reviewSchema = new mongoose.Schema({
  idNameNumber: String,
  user: String,
  isbn: Number,
  text: String,
  rating: Number
});

var Book = mongoose.model('Book', bookSchema);
var User = mongoose.model('User', userSchema);
var Review = mongoose.model('Review', reviewSchema);

var selectAllBooks = function(callback) {
  Book.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};


//********************

var bookOne = new Book({
  title: 'Test Book Title 1',
  author: 'Test Author 1',
  genres: ['Horror', 'Comedy'],
  isbn: 1234567890,
  reviews: []
});
var bookTwo = new Book({
  title: 'Test Book Title 2',
  author: 'Test Author 2',
  genres: ['True Crimes', 'Comedy'],
  isbn: 11234567890,
  reviews: []
});
var bookThree = new Book({
  title: 'Test Book Title 3',
  author: 'Test Author 3',
  genres: ['Suspense', 'Action'],
  isbn: 99234567890,
  reviews: []
});

var testUser = new User({
    name: 'dustin burns',
    username: 'dust_off',
    password: '1234',
    reviewedBooks: [1234567890],
    favoriteBooks: [1234567890, 11234567890, 99234567890]
});

var fakeReview = new Review({
  idNameNumber: 'dust_off1234567890',
  user: 'dust_off',
  isbn: 1234567890,
  text: 'I hated it',
  rating: 4
});

// bookOne.save();
// bookTwo.save();
// bookThree.save();
// testUser.save();
// fakeReview.save();

var findUserFavorites = (user, cb) => {
  var books = []
  User.find({username: user}).then((data)=> {

    var len = data[0].favoriteBooks.length

    data[0].favoriteBooks.forEach((book)=> {
      Book.find({isbn: book}).then((data)=> {
        books.push(data)
      }).then(()=>{
        if(books.length === len) {
          cb(books)
        }
      })
    })
  })
}

var findUserReviews = (user, cb) => {
  var reviews = []
  User.find({username: user}).then((data)=> {

    var len = data[0].reviewedBooks.length;

    data[0].reviewedBooks.forEach((book)=> {
      var id = data[0].username + book
      Review.find({idNameNumber: id}).then((data)=> {
        reviews.push(data)
      }).then(()=>{
        if(reviews.length === len) {
          cb(reviews)
        }
      })
    })
  })
}

var findProfile = (user, cb) => {
  User.find({username: user}).exec(cb)
}

module.exports = {
  selectAllBooks,
  findUserFavorites,
  findUserReviews,
  findProfile
}
