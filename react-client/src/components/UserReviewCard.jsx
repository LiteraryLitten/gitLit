import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader } from 'material-ui/Card';
import red from 'material-ui/colors/red';

const styles = theme => ({
  card: {
    maxWidth: 'auto',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class UserReviewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: this.props.book,
      userReviews: this.props.userReviews,
    };
    this.getAvatar = this.getAvatar.bind(this);
    console.log('');
    console.log('UserReviewCard props =', this.props);
  }

  getAvatar() {
    // get the reviewer's avatar
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            // replace with review data
            // get the user avatars for each review?
            <img src={this.props.book.imageURL} alt="" />
              }

          // userName here
          title={this.props.book.author}
          subheader={this.props.review.text}
        />
      </Card>
    );
  }
}

UserReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserReviewCard);
