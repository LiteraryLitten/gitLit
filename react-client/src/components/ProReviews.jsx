import React from 'react';
import axios from 'axios';

import BookCard from './BookCard.jsx';

class ProReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isbn13: '',
      reviews: [],     
    };

    this.getProReviews = this.getProReviews.bind(this);
  }

  getProReviews(isbn13) {
    isbn13 = this.state.isbn13;

    axios.get(`/proreviews/${isbn13}`)
      .then((response) => {
        console.log('Pro reviews recieved', response);
        this.setState({
          reviews: response,
        });
      })
      .catch((error) => {
        console.log('ProReviews are not recieved', error);
      });
  }

  render() {
    return (
      <div>
        {this.state.reviews}
      </div>
    );
  }
}


export default ProReviews;
