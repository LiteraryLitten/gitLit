import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader } from 'material-ui/Card';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Divider from 'material-ui/Divider';
import renderHTML from 'react-render-html';

import Rating from './Rating.jsx';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  card: {
    maxWidth: 300,
  },
  media: {
    height: 25,
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

class BookShelfCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: this.props.book,
    };
    // this.submitRank = this.submitRank.bind(this);
    this.goToBook = this.goToBook.bind(this);
  }

  goToBook() {
    this.props.changeView('Book', this.state.book);
  }

  handleExpandClick() {
    console.log('expand');
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid item style={{ padding: 10 }} >
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <img src={this.state.book.imageURL} alt="" />
              }
            onClick={this.goToBook}
            style={{ cursor: 'pointer' }}
          />
        </Card>
      </Grid>
    );
  }
}

BookShelfCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookShelfCard);
