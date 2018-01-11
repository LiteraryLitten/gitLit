import React from 'react';

class BookPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookData: this.props.book,
      title: '',
      published: '',
      author: '',
      averageRating: '',
      description: '',
      imageURL: '',
      pages: 0,
      popularShelves: [],
    };
  }

  componentDidMount() {
    // /book/:isbn
    const lookFor = this.props.book ? 'Catcher in the Rye' : this.props.book;
    this.props.fetch('book', lookFor, (data) => {
      console.log(data);
      this.setState({
        bookData: data,
        title: data.title,
        published: `${data.month}-${data.day}-${data.year}`,
        author: data.author,
        averageRating: data.averageRating,
        description: data.description,
        imageURL: data.imageURL,
        pages: data.pages,
        popularShelves: data.popularShelves,

      });
    });
  }

  render() {
    const isbn = '9780399178573';
    // http://covers.openlibrary.org/b/isbn/9780385472579-S.jpg
    // http://covers.openlibrary.org/b/isbn/9780399178573-L.jpg
    return (
      <div>
        <img src="http://covers.openlibrary.org/b/isbn/9780399178573-L.jpg" />
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
