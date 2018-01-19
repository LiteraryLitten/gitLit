import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import classnames from 'classnames';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
// import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
// import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Divider from 'material-ui/Divider';
import renderHTML from 'react-render-html';
import axios from 'axios';
// import $ from 'jquery';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

// import PopUp from './PopUp.jsx';
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
      user: this.props.userProfile,
      liked: false,
      thing: 0,
      popUp: false,
    };
    this.goToBook = this.goToBook.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.addtoFavorites = this.addtoFavorites.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.popUpClick = this.popUpClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.loadUserReviews = this.loadUserReviews.bind(this);
    console.log('on line 63 @ class bookcard', this.props.user);
    // this.addtoFavorites = this.addtoFavorites.bind(this);
    // console.log(" this.props.")
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
    // this.loadUserReviews();
  }

  goToBook() {
    this.props.changeView('Book', this.state.book);
  }

  handleExpandClick() {
    console.log('expand');
    this.setState({ expanded: !this.state.expanded });
  }

  updateFavorite() {
    if (this.props.userProfile.favoriteBooks.length > 0 && !this.state.liked) {
      this.props.userProfile.favoriteBooks.forEach((isbn13) => {
        if (isbn13 - this.state.book.isbn13 === 0) {
          this.setState({
            liked: true,
          }, () => { this.setState({ thing: Math.random() }); });
        }
      });
    }
  }

  toggleFavorite() {
    this.setState({ liked: !this.state.liked });
  }

  addtoFavorites() {
    // console.log(this.props.userProfile);
    // alert('you clicked me', this.props.userProfile);
    this.toggleFavorite();
    axios({
      method: 'post',
      url: '/favorites',
      data: {
        user: this.props.userProfile,
        isbn13: this.state.book.isbn13,
      },
    })
      .then((response) => {
        const newFavs = JSON.parse(response.config.data);
        // console.log('response.body', newFavs);
        const user = this.props.userProfile;
        user.favoriteBooks = response;
        this.props.updateUserData(user);
      });
  }

  popUpClick() {
    console.log('you clicked me');
    this.setState({
      popUp: true,
    });
  }

  handleClose() {
    this.setState({
      popUp: false,
    });
  }

  popUpShow() {
    if (this.state.popUp) {
      return (
        <Dialog
          open={this.state.popUp}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Description</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {renderHTML(this.state.book.description)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
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
          <CardContent
            onClick={this.popUpClick}
            style={{ cursor: 'pointer' }}
          >
            <Typography component="p">
              {this.state.description}
              {this.popUpShow()}
            </Typography>
          </CardContent>

          <Divider light />

          <CardContent>
            <Typography component="p">
              {this.state.book.genres.map(genre => (
                `${genre[0].toUpperCase() + genre.slice(1)} `
            ))}
            </Typography>
          </CardContent>

          <Divider light />
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites" >
              <FavoriteIcon
                onClick={this.addtoFavorites}
              />
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
