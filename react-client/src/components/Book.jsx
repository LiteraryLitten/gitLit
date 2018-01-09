import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: []
    }
  }

  componentDidMount() {

  }

  render () {
    return (
      <div>
      <h1>Book:</h1>
    </div>)
  }
}

export default Book;
