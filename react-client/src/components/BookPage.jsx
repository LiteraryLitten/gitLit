import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import renderHTML from 'react-render-html';
import Grid from 'material-ui/Grid';
import Rating from './Rating.jsx';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  pic: {
    textAlign: 'center',
  },
  p: {
    backgroundColor: 'lightgrey',
  },
  note: {
    textAlign: 'right',
  },
});

class BookPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {
        bookData: '',
        title: '',
        published: '',
        author: '',
        averageRating: '',
        description: '',
        imageURL: '',
        pages: '',
        popularShelves: '',
        isbn13: 0,
      },
      typeReview: '',
      rating: 0,
    };
  }

  componentDidMount() {
    const lookFor = this.props.book ? '9780871404428' : this.props.book;
    this.props.fetch('book', lookFor, (data) => {
      console.log('in bookpage', data);
      this.setState({
        book: {
          bookData: data,
          title: data.title,
          published: `${data.month}-${data.day}-${data.year}`,
          author: data.author,
          averageRating: data.averageRating,
          description: data.description,
          imageURL: data.imageURL,
          pages: data.pages,
          popularShelves: data.popularShelves,
          isbn13: data.isbn13,
        },
        typeReview: '',
      });
    });
    this.submitRating = this.submitRating.bind(this);
    this.submitRank = this.submitRank.bind(this);
    this.enterReview = this.enterReview.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  // submitRank() {
  //   console.log('ranked');
  // }

  enterReview(e) {
    this.setState({
      typeReview: e.target.value,
    });
  }

  submitReview() {
    const review = this.state.typeReview;
    const { isbn13 } = this.state.book;
    const { rating } = this.state;
    this.props.submitReview(review, isbn13, rating);
  }

  submitRating(rating) {
    this.setState({
      rating,
    });

    this.submitReview();

    // const isbn13 = this.props.book.isbn13 || 'isbn';
    // const url = `/rate/${isbn13}/${rating}`;
    //
    // fetch(url)
    //   .then(res => res.json())
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={1} />

          <Grid item xs sm={2} className={classes.pic}>
            <img src={this.state.book.imageURL} />

            <Rating
              icon="Star"
              defaultRating={3}
              maxRating={5}
              click={this.submitRating}
            />

            <Typography>
              <span className={classes.p}>
                {this.state.book.author}
              </span>
              <br />
              <span className={classes.p}>
                {this.state.book.published}
              </span>
            </Typography>
          </Grid>
          <Grid item xs sm={7}>
            <Paper className={classes.paper}>
              {renderHTML(this.state.book.description)}
            </Paper>
          </Grid>

          <Grid item xs={6} sm={3} style={{ textAlign: 'right' }}>
            <Button
              raised
              className={classes.button}
              disabled={!(this.state.typeReview.length > 1)}
              onClick={this.submitReview}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Paper className={classes.paper}>

              <TextField
                multiline
                rows={5}
                label="Review"
                InputLabelProps={{
                    shrink: true,
                  }}
                placeholder="Reviwe Here"
                fullWidth
                margin="normal"
                onChange={this.enterReview}
              />

            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} />
        </Grid>
      </div>
    );
  }
}

// BookPage.propTypes = {
//   book: PropTypes.element.isRequired,
// };

export default withStyles(styles)(BookPage);
