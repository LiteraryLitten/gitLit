import React from 'react';
import $ from 'jquery';
import StarRatings from 'react-star-ratings';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
    this.getBestSellersBooks = this.getBestSellersBooks.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
  }

  componentDidMount() {
    this.getBestSellersBooks();
  }

  getBestSellersBooks() {
    $.ajax({
      url: '/bestSellers',
      type: 'GET',
    })
    .done((result) => {
      const books = result.results.slice(0, 3);
        books.forEach((book) => {
          const isbn = book.isbns[0].isbn13;
          this.props.fetch('book', isbn, (goodReads) => {
            book.imageURL = goodReads.imageURL;
            book.averageRating = goodReads.averageRating;


          });
        });
        this.setState({
          books: books,
        });
        console.log(this.state.books);
    })
    .fail((err) => {
      throw err;
    });
  }

  handleUserClick () {
    console.log("I was clicked");
  }

  render() {
    return (
      <div>
        <h1> Literary Litten: The Rotten Tomatoes for Books</h1>
        <div>

        </div>
      </div>
    );
  }
}

export default HomePage;
