import React from 'react';
import $ from 'jquery';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestSellerBook1: '',
      bestSellerBook2: '',
      bestSellerBook3: '',
      imageUrl1: '',
      imageUrl2: '',
      imageUrl3: '',
      star1: 0,
      star2: 0,
      star3: 0,
    };
    this.getBestSellersBooks = this.getBestSellersBooks.bind(this);
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
      const books = result.results;
      console.log(books);
      const book1 = books[0];
      const book2 = books[1];
      const book3 = books[2];
      const b1isbn = book1.isbns[0].isbn13;
      const b2isbn = book2.isbns[0].isbn13;
      const b3isbn = book3.isbns[0].isbn13;

      if (b1isbn) {
        this.props.fetch('book', b1isbn, (book) => {
          this.setState({
            imageUrl1: book.imageURL,
            star1: book.averageRating,
          });
        });
      }

      if (b2isbn) {
        this.props.fetch('book', b2isbn, (book) => {
          this.setState({
            imageUrl2: book.imageURL,
            star2: book.averageRating,
          });
        });
      }

      if (b3isbn) {
        this.props.fetch('book', b3isbn, (book) => {
          this.setState({
            imageUrl3: book.imageURL,
            star3: book.averageRating,
          });
        });
      }

      this.setState({
        bestSellerBook1: book1,
        bestSellerBook2: book2,
        bestSellerBook3: book3,
      });
    })
    .fail((err) => {
      throw err;
    });
  }

  render() {
    return (
      <div>
        <h1> Literary Litten: The Rotten Tomatoes for Books</h1>
        <div>
          {this.state.bestSellerBook1
            ?
              <div>
                <img src={this.state.imageUrl1} />
                <div className="bookTitle1"> {this.state.bestSellerBook1.title} star: {this.state.star1}</div>
                <div className="bookTitle1"> by {this.state.bestSellerBook1.author} </div>
                <div className="bookTitle1"> {this.state.bestSellerBook1.description} </div>
                <img src={this.state.imageUrl2} />
                <div className="bookTitle2"> {this.state.bestSellerBook2.title} star: {this.state.star2}</div>
                <div className="bookTitle2"> by {this.state.bestSellerBook2.author} </div>
                <div className="bookTitle2"> {this.state.bestSellerBook2.description} </div>
                <img src={this.state.imageUrl3} />
                <div className="bookTitle3"> {this.state.bestSellerBook3.title} star: {this.state.star3}</div>
                <div className="bookTitle3"> by {this.state.bestSellerBook3.author} </div>
                <div className="bookTitle3"> {this.state.bestSellerBook3.description} </div>
              </div>
          : 'loading ...'}
        </div>
      </div>
    );
  }
}

export default HomePage;
