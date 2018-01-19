import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Divider from 'material-ui/Divider';
import renderHTML from 'react-render-html';
import axios from 'axios';

import PopUp from './PopUp.jsx';
import Rating from './Rating.jsx';

import Grid from 'material-ui/Grid';

const styles = theme => ({
  card: {
    maxWidth: 300,
    // height: 200,
  },
  media: {
    height: 25,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  control: {
    padding: 100,
  },
});

class BookCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: this.props.book,
      isbn: this.props.book.isbn13,
      expanded: false,
      rating: 0,
      description: '',

    };
    this.submitRank = this.submitRank.bind(this);
    this.goToBook = this.goToBook.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  componentDidMount() {
    let str = this.props.book.description;
    str = str.replace(/<br>/gi, '\n');
    str = str.replace(/<p.*>/gi, '\n');
    str = str.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, ' $2 (Link->$1) ');
    str = str.replace(/<(?:.|\s)*?>/g, '');
    const arrayString = `${str.split(' ').join(' ').substring(0, 200)}...`;
    this.setState({
      description: arrayString,
    });
  }

  goToBook() {
    this.props.getProReviews(this.state.isbn, (response) => {
      let book = this.state.book;
      book.proreviews = response.data;
      console.log(book.proreviews);
      this.props.changeView('Book', book);
    });
  }

  handleExpandClick() {
    console.log('expand');
    this.setState({ expanded: !this.state.expanded });
  }

  submitRank(rating) {
    // stuff here
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid item style={{ padding: 20 }} >
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <img src={this.state.book.imageURL} alt="" />
              }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
              }
            title={this.state.book.title}
            subheader={this.state.book.author}
            onClick={this.goToBook}
            style={{ cursor: 'pointer' }}
          />
          <Divider light />
          <CardContent>
            <Typography component="p">
              {this.state.description} <PopUp description={this.state.book.description} />
            </Typography>
          </CardContent>

          <Divider light />

          <CardContent>
          <Typography component="p">
            {this.state.book.genres.map(genre => (
                genre[0].toUpperCase() + genre.slice(1) + ' '
            ))}
          </Typography>
          </CardContent>

          <Divider light />
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>

            <Rating
              icon="Star"
              defaultRating={this.state.book.averageRating}
              maxRating={5}
              click={this.submitRank}
            />

            <div className={classes.flexGrow} />
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

BookCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookCard);
