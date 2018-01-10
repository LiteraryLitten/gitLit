import React from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
// import $ from 'jquery';

class BookPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookData: this.props.book,
      title: '',
      published: '',
      author: '',
    };
  }

  componentDidMount() {
    // console.log('mounted');
    const lookFor = this.props.book ? '0316769177' : this.props.book;
    this.props.fetch('search', lookFor, (data) => {
      console.log('test', data);
      this.setState({
        bookData: data,
        title: data.title,
        published: `${data.month}-${data.day}-${data.year}`,
        author: data.author,
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.bookData.title
          ?
            <div>
              <h1>
                Book:{this.state.title}
              </h1>
              <div>
                {this.state.author} {this.state.published}
              </div>
            </div>
          : 'Loading'}
      </div>
    );
  }
}

// BookPage.propTypes = {
//   book: PropTypes.element.isRequired,
// };

export default BookPage;
