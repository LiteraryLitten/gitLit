import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import key from '../env/config.js';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestSellerBook: ''
      };
    this.getBestSellersBooks = this.getBestSellersBooks.bind(this);
  }

  componentDidMount() {
    this.getBestSellersBooks();
  }

  getBestSellersBooks() {
    var url = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json";
    url += '?' + $.param({'api-key': "ad2386dd7c8d4de2968ee43d3310d34a"});

    $.ajax({
      url: url,
      method: 'GET',
      }).done(function(result) {
      console.log(result.results.title);
      this.setState({
        bestSellerBooks: result
      });
    }).fail(function(err) {
      throw err;
    });
  }

  render () {
    return (
      <div>
      <h1 >LiteraryLitten: The Rotten Tomatoes for Books</h1>
      <div className="bestSellerBooks"> Best Sellers Books view here</div>
      <div className="bookTitle" >       stars: </div>

    </div>)
  }
}

export default HomePage;
