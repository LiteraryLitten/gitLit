import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class BookPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: this.props.book
    }
  }

  componentDidMount() {

  }

  render () {
    return (
      <div>
      <h1>Book:</h1>
    </div>
    )
  }
}

export default BookPage;
