import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
// import Zoom from 'material-ui/transitions/Zoom';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import EditIcon from 'material-ui-icons/ModeEdit';
import UpIcon from 'material-ui-icons/KeyboardArrowUp';
import green from 'material-ui/colors/green';
import ProReviewsCard from './ProReviewsCard.jsx';
import axios from 'axios';
import UserReviewCard from './UserReviewCard';


function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
//   dir: PropTypes.string.isRequired,
// };

const styles = theme => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: 'auto',
    position: 'relative',
    minHeight: 200,
  },
  // fab: {
  //   position: 'absolute',
  //   bottom: theme.spacing.unit * 2,
  //   right: theme.spacing.unit * 2,
  // },
  fabGreen: {
    backgroundColor: green[500],
  },
});

class ReviewPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: this.props.book,
      value: 0,
      proReviews: this.props.proReviews,
      pro: false,
      userReviews: this.props.userReviews,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.renderProReviews = this.renderProReviews.bind(this);
    this.getProReviews = this.getProReviews.bind(this);
    this.renderUserReviewCard = this.renderUserReviewCard.bind(this);
    console.log('');
    console.log('ReviewPanel props =', this.props);
  }

  getProReviews(isbn, callback) {
    const { isbn13 } = this.state.book;
    axios.get(`/proreviews/${isbn13}`)
      .then((response) => {
        console.log(response);
        callback(response);
      })
      .catch((error) => {
        console.log('ProReviews are not received', error);
      });
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  handleChangeIndex(index) {
    this.setState({ value: index });
  }

  renderProReviews() {
    const reviewCards = [];
    this.props.proReviews.forEach((review) => {
      const { source, date } = review;
      const id = `${source}_${date}`;
      reviewCards.push(<ProReviewsCard review={review} key={id} />);
    });
    return reviewCards;
  }

  renderUserReviewCard() {
    const reviewCards = [];
    this.props.userReviews.forEach((review) => {
      // console.log('renderUserReviewCard ForEACH', review);
      // const { source, date } = review;
      // const id = `${source}_${date}`; //key={id}
      reviewCards.push(<UserReviewCard review={review} book={this.props.book} />);
    });
    return reviewCards;
  }

  render() {
    const { classes, theme } = this.props;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };

    const fabs = [
      {
        color: 'primary',
        className: classes.fab,
        icon: <AddIcon />,
      },
      {
        color: 'accent',
        className: classes.fab,
        icon: <EditIcon />,
      },
      {
        color: 'contrast',
        className: classNames(classes.fab, classes.fabGreen),
        icon: <UpIcon />,
      },
    ];

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Reviews" />
            <Tab label="User Reviews" />
            <Tab label="Write a Review" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          // style={{ 'overflow-y': 'auto' }}
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          // animateHeight
        >
          <TabContainer
            dir={theme.direction}
          >
            {/* {this.state.pro ? this.renderProReviews() : 'fail'} */}

            {this.props.proReviews.length > 0
              ? this.renderProReviews()
              : 'Loading Reviews'
            }
          </TabContainer>

          <TabContainer dir={theme.direction}>

            {/* <UserReviewCard
              book={this.state.book}
              userReviews={this.state.userReviews}
            /> */}
            {this.props.proReviews.length > 0
              ? this.renderUserReviewCard()
              : 'Loading Reviews'
            }

          </TabContainer>

          <TabContainer dir={theme.direction}>
            Item Three
          </TabContainer>

        </SwipeableViews>
      </div>
    );
  }
}

ReviewPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ReviewPanel);