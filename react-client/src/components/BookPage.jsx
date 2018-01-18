import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import renderHTML from 'react-render-html';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Rating from './Rating.jsx';
// import ProReviewsCard from './ProReviewsCard.jsx';
import ReviewPanel from './ReviewPanel';
// import UserReviewCard from './UserReviewCard';

const axios = require('axios');

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
        proreviews: [],
      },
      proreviews: [],
      typeReview: '',
      rating: 0,
      pro: false,
      userReviews: [],
    };
    this.submitRating = this.submitRating.bind(this);
    this.enterReview = this.enterReview.bind(this);
    this.passReview = this.passReview.bind(this);
    this.loadUserReviews = this.loadUserReviews.bind(this);
    this.loadProReviews = this.loadProReviews.bind(this);
    console.log('');
    console.log('BookPage props =', this.props);
  }

  componentDidMount() {
    if (typeof this.props.book === 'object' && this.props.book.isbn13) {
      console.log(this.props.book.isbn13);
      this.setState({
        book: this.props.book,
      });
    } else {
      const lookFor = this.props.book ? '9780871404428' : this.props.book;
      this.props.fetch('book', lookFor, (data) => {
        data.published = `${data.month}-${data.day}-${data.year}`;
        this.setState({
          book: data,
          typeReview: '',
        });
      });
    }
    this.loadUserReviews();
    this.loadProReviews();
  }

  loadProReviews() {
    console.log('proReviews are trying to mount');
    this.props.getProReviews(this.props.book.isbn13, (response) => {
      console.log('ProREview response bookPage @ 87', response);
      // const book = this.state.book;
      this.setState({
        proreviews: response.data,
        pro: true,
      });
    });
  }

  enterReview(e) {
    this.setState({
      typeReview: e.target.value,
    });
  }

  passReview() {
    const { isbn13 } = this.state.book;
    this.props.submitReview(this.state.typeReview, isbn13, this.state.rating);
  }

  submitRating(rating) {
    // console.log(" on line 88 in submitRating", this.props.)
    this.setState({
      rating,
    }, this.passReview);
  }

  loadUserReviews() {
    const url = `/userReviews/${this.props.book.isbn13}`;
    console.log('   -BookPage is loading UserReviews with', url);
    axios(url)
      .then((data) => {
        console.log('returned to BookPage @ loadUserReviews 124-data=', data);
        this.setState({
          userReviews: data.data,
        });
      })
      .catch(err => console.log('error when loading loadUserReviews on BookPage'));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={1} />

          <Grid item xs sm={2} className={classes.pic}>
            <img src={this.state.book.imageURL} alt="" />

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
              {this.state.proreviews}
            </Paper>
          </Grid>

<<<<<<< HEAD
          <Grid>
            <ProReviews proreviews={this.state.proreviews}/>
          </Grid>
=======
>>>>>>> Pro reviews fetuare is complete

          <Grid item xs={6} sm={3} style={{ textAlign: 'right' }}>
            <Button
              raised
              className={classes.button}
              disabled={!(this.state.typeReview.length > 1)}
              onClick={this.passReview}
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
                placeholder="Review Here"
                fullWidth
                margin="normal"
                onChange={this.enterReview}
              />

            </Paper>

            <Paper>

              <ReviewPanel
                proReviews={this.state.proreviews}
                userReviews={this.state.userReviews}
                book={this.props.book}
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