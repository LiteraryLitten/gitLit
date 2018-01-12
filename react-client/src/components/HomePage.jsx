import React from 'react';
import $ from 'jquery';

// import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
// import { FormLabel, FormControlLabel } from 'material-ui/Form';
// import Radio, { RadioGroup } from 'material-ui/Radio';
// import Paper from 'material-ui/Paper';

import BookCard from './BookCard.jsx';

const styles = theme => ({
  // root: {
  //   flexGrow: 1,
  // },
  // paper: {
  //   height: 140,
  //   width: 100,
  // },
  // control: {
  //   padding: theme.spacing.unit * 2,
  // },
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
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
        const books = result.results.slice(0, 3);
        books.forEach((book) => {
          const isbn = book.isbns[0].isbn13;
          this.props.fetch('book', isbn, (goodReads) => {
            book.imageURL = goodReads.imageURL;
            book.averageRating = goodReads.averageRating;
          });
        });
        this.setState({
          books,
        });
        console.log(this.state.books);
      })
      .fail((err) => {
        throw err;
      });
  }

  render() {
    return (
      <Grid
        container
      >
        {this.state.books.map(book => (
          <BookCard book={book} />
              ))}
      </Grid>
    );
  }
}

// GuttersGrid.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(HomePage);
