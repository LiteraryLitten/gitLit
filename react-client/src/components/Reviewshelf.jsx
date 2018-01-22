import React from 'react';
import ReviewShelfCard from './ReviewShelfCard.jsx';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class Reviewshelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookObjects: [],
      bookReviews: [],
    };
    this.getBookData = this.getBookData.bind(this);
    this.renderView = this.renderView.bind(this);
    this.getReviewData = this.getReviewData.bind(this);
  }

  componentDidMount() {
    this.props.books.map((isbn) => {
      this.getBookData(isbn);
    });
    this.getReviewData(this.props.user.username);
  }

  getBookData(isbn) {
    this.props.fetch('book', isbn, (book) => {
      book.reviews = [];
      this.setState({ bookObjects: [...this.state.bookObjects, book] }, function () {
        // console.log(this.state.bookObjects);
        // create a renderview
        this.renderView();
      });
    });
  }

  getReviewData(user) {
    // i want to search the REVIEW schema by USER to retriever ALL the reviews written by USER

    // fetch to server
    // store reviews by this.setState( {bookReviews: data})
    // renderview
    // console.log("IN REVIEWSHELF: ",user);
    this.props.fetch('reviewShelf', user, (reviews) => {
      // console.log('IN FETCH reviewShelf', reviews);
      this.setState({ bookReviews: reviews }, function () {
        this.renderView();
      });
    });
  }


  renderView() {
    return (
      <div>
        <Grid
          container
          justify="center"
        >
          {this.state.bookObjects.map(book => (
            // <div>
            <ReviewShelfCard
              book={book}
              key={book.isbn13}
              changeView={this.props.changeView}
              allReviews={this.state.bookReviews}
            />
            // </div>
            ))}
        </Grid>
      </div>
    );
  }

  render() {
    return (
      this.renderView()

    );
  }
}


export default withStyles(styles)(Reviewshelf);

/** *
<BookCard
          book={book}
          key={book.isbn13}
          changeView={this.props.changeView}
        />
        */
