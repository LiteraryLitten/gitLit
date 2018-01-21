import React from 'react';
import BookShelfCard from './BookShelfCard.jsx';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

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
        // console.log(this.state.bookObjects);
        //create a renderview
        this.renderView();
      });
    });
  }

  renderView () {
    return (
      <div>
        <Grid
          container
          justify="center"
        >
          {this.state.bookObjects.map(book => (
            <div>
              <BookShelfCard
                book={book}
                key={book.isbn13}
                changeView={this.props.changeView}
              />
            </div>
            ))}
        </Grid>
      </div>
    );
  }

  render () {
    return (
      this.renderView()
      
    );
  }
}


export default withStyles(styles)(Bookshelf);

/***
<BookCard
          book={book}
          key={book.isbn13}
          changeView={this.props.changeView}
        />
        */
