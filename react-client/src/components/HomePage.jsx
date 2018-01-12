import React from 'react';
import $ from 'jquery';
import StarRatings from 'react-star-ratings';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestSellerBooks: [],
      bestSellerBook1: '',
      bestSellerBook2: '',
      bestSellerBook3: '',
      imageUrl1: '',
      imageUrl2: '',
      imageUrl3: '',
      star1: 0,
      star2: 0,
      star3: 0
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
      const books = result.results.slice(0, 3); // use a slice over collection
      console.log(books);
      const book1 = books[0];
      const book2 = books[1];
      const book3 = books[2];
      const b1isbn = book1.isbns[0].isbn13;
      const b2isbn = book2.isbns[0].isbn13;
      const b3isbn = book3.isbns[0].isbn13;
      books.map((book) => {

          this.props.fetch('book', b1isbn, (book) => {
            this.setState({
            imageUrl1: book.imageURL,
            star1: book.averageRating,
          });
        });

      });

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
        bestSellerBooks: books.slice(0, 3),
        bestSellerBook1: book1,
        bestSellerBook2: book2,
        bestSellerBook3: book3,
      });
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
          {this.state.bestSellerBook1
            ?
              <div>
                <img src={this.state.imageUrl1} onClick={this.handleUserClick} />
                <StarRatings rating={Number(this.state.star1)} isSelectable={false} isAggregateRating={true} numOfStars={5} />
                <div className="bookTitle1"> {this.state.bestSellerBook1.title}</div>
                <div className="bookTitle1"> by {this.state.bestSellerBook1.author} </div>
                <div className="bookTitle1"> {this.state.bestSellerBook1.description} </div>
                <img src={this.state.imageUrl2} onClick={this.handleUserClick}/>
                <div className="bookTitle2"> {this.state.bestSellerBook2.title} star: {this.state.star2}</div>
                <div className="bookTitle2"> by {this.state.bestSellerBook2.author} </div>
                <div className="bookTitle2"> {this.state.bestSellerBook2.description} </div>
                <img src={this.state.imageUrl3} onClick={this.handleUserClick}/>
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
