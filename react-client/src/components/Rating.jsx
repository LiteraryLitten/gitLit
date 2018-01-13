import React from 'react';
// import Star from 'material-ui-icons/Stars';
// import Star from 'material-ui/svg-icons/toggle/star'
// import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import { StarBorder, Star } from 'material-ui-icons';
// import { orange, grey } from 'material-ui/colors';
import green from 'material-ui/colors/green';


const styles = {
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '70%',
  },
  iconHover: {
    '&:hover': {
      fill: green[200],
    },
  },
};

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 5,
      current: Math.round(this.props.current),
    };
    this.renderRating = this.renderRating.bind(this);
  }

  renderRating() {
    const div = [];
    const other = this.state.total - this.state.current;
    for (let i = 0; i < this.state.current; i + 1) {
      div.push(<Star key={i} />);
    }
    for (let i = 0; i < other; i + 1) {
      div.push(<StarBorder key={other + i} />);
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
