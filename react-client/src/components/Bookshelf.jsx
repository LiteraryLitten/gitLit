import React from 'react';
import BookCard from './BookCard.jsx';

class Bookshelf extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      bookObjects: [],
    }
    this.getBookData = this.getBookData.bind(this);
    this.renderView = this.renderView.bind(this);
  }

  componentDidMount() {
    this.props.books.map((isbn) => {
      this.getBookData(isbn);
    });
  }

  getBookData(isbn) {
    this.props.fetch('book', isbn, (book) => {
      this.setState({ bookObjects: [...this.state.bookObjects, book] }, function() {
        console.log(this.state.bookObjects);
        //create a renderview
        this.renderView();
      });
    });
  }

  renderView () {
    return (
      <div>
        <h4>Books</h4>
        {this.state.bookObjects.map((book) => {
          return(
            <div>
            <BookCard
              book={book}
              key={book.isbn13}
              changeView={this.props.changeView}
            />
            </div>
          )
        })}
      </div>
    );
  }

  render () {
    return (
      this.renderView()
      
    );
  }
}


export default Bookshelf;

/***
<BookCard
          book={book}
          key={book.isbn13}
          changeView={this.props.changeView}
        />
        */
