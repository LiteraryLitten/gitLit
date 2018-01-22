import React from 'react';
import $ from 'jquery';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';
import Divider from 'material-ui/Divider';

import BookCard from './BookCard.jsx';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    };
  }

  componentDidMount() {
    this.setState({ searchResults: this.props.searchResults });
  }

  buildBook(book) {
    const cleanBook = {};
    cleanBook.year = book.publication_year._text;
    cleanBook.month = book.publication_month._text;
    cleanBook.title = book.title._cdata;
    // cleanBook.author = /*book.authors.author.name._text || */ book.authors.author[0].name._text;
    cleanBook.averageRating = book.average_rating._text;
    cleanBook.isbn13 = book.isbn13._cdata;
    cleanBook.imageURL = book.small_image_url._text;
    cleanBook.description = book.description._cdata;
    cleanBook.genres = [];
    // console.log(book);
    // console.log(cleanBook);
    return cleanBook;
  }

  render() {
    const { classes } = this.props;
    const searchCards = [];

    if (this.props.searchResults) {
      // console.log(this.props.searchResults);
      this.props.searchResults.forEach((result) => {
        if (result !== null) {
          searchCards.push(this.buildBook(result));
        }
      });
      return (
        <div>
          <h1 style={{ textAlign: 'center' }}> Best Sellers </h1>
          <Divider light />
          <Grid
            container
            justify="center"
          >
            {searchCards.map(book => (
              <BookCard
                key={book.isbn13}
                book={book}
                changeView={this.props.changeView}
                userProfile={this.props.userProfile}
                getProReviews={this.props.getProReviews}
              />
            // <span key={book.title}>{JSON.stringify(book)}</span>
          ))}
          </Grid>
        </div>
      );
    }

    return (
      <div>
        {/* <h2>LOADING SEARCH RESULTS</h2> <br /> */}
        <div style={{ textAlign: 'center' }}>
          <CircularProgress
            className={classes.progress}
            size={100}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SearchPage);
