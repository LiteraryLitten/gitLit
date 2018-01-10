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
      // console.log(data);
      const year = data.original_publication_year._text;
      const month = data.original_publication_month._text;
      const day = data.original_publication_day._text;
      const date = `${month}-${day}-${year}`;
      this.setState({
        bookData: data,
        title: data.best_book.title._text,
        published: date,
        author: data.best_book.author.name._text,
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.bookData.best_book
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
