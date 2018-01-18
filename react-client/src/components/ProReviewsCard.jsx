import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import classNames from 'classnames';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
// import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
// import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Divider from 'material-ui/Divider';
// import renderHTML from 'react-render-html';
// import PopUp from './PopUp.jsx';
// import Rating from './Rating.jsx';
import Grid from 'material-ui/Grid';
// import Button, { ButtonProps } from 'material-ui/Button';

const styles = theme => ({
  card: {
    maxWidth: 'auto',
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
    maxWidth: '100px',
    maxHeight: '100px',
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  control: {
    padding: 100,
  },
  root: {
    color: 'inherit',
    textDecoration: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  primary: {
    color: theme.palette.primary.main,
  },
});


class ProReviewsCard extends React.Component {
  constructor(props) {
    super(props);
    console.log('    #ProReviewsCard loaded with props=', this.props);
  }


  render() {
    const { classes } = this.props;
    return (
      <Card
        className={classes.card}
        onClick={() => window.open(this.props.review.review_link, '_blank')}
      >
        <CardHeader
          avatar={
            <img
              src={this.props.review.source_logo}
              alt=""
              style={{ height: '100px' }}
            />
              }
          title={this.props.review.source}
          subheader={this.props.review.snippet}
          style={{ cursor: 'pointer' }}
        />
      </Card>
    );
  }
}


export default withStyles(styles)(ProReviewsCard);
