import React from 'react';
// import Star from 'material-ui-icons/Stars';
// import Star from 'material-ui/svg-icons/toggle/star'
// import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import { StarBorder, Star, Heart } from 'material-ui-icons';
// import { orange, grey } from 'material-ui/colors';
// import green from 'material-ui/colors/green';


// const styles = {
//   root: {
//     display: 'flex',
//     alignItems: 'flex-end',
//     justifyContent: 'space-around',
//     width: '70%',
//   },
//   iconHover: {
//     '&:hover': {
//       fill: green[200],
//     },
//   },
// };

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: '',
      maxRating: this.props.maxRating || 5,
      currentRating: this.props.defaultRating || 2,
    };
    this.renderRating = this.renderRating.bind(this);
    this.clickRate = this.clickRate.bind(this);
  }

  clickRate(rating) {
    this.setState({
      currentRating: rating,
    });
    if (this.props.click) {
      this.props.click(rating);
    }
  }

  renderRating() {
    const div = [];
    for (let num = 1; num < this.state.maxRating + 1; num++) {
      if (num <= this.state.currentRating) {
        div.push(<Star key={num} onClick={() => this.clickRate(num)} />);
      } else {
        div.push(<StarBorder key={num} onClick={() => this.clickRate(num)} />);
      }
    }
    return div;
  }

  render() {
    return (
      <div>
        {this.renderRating()}
      </div>
    );
  }
}

export default Rating;
