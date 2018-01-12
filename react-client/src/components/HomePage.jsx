import React from 'react';
import $ from 'jquery';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { FormLabel, FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      spacing: '16',
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
          books,
        });
        console.log(this.state.books);
      })
      .fail((err) => {
        throw err;
      });
  }

  handleUserClick() {
    console.log('I was clicked');
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <div>
        {/* <h1> Literary Litten: The Rotten Tomatoes for Books</h1> */}
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
              {[0, 1, 2].map(value => (
                <Grid key={value} item>
                  <Paper className={classes.paper} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// GuttersGrid.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(HomePage);

// export default HomePage;
