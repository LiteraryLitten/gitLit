import React from 'react';
// import ReactDOM from 'react-dom';
import $ from 'jquery';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestSellerBook1: '',
      bestSellerBook2: '',
      bestSellerBook3: '',
      isbn1: '',
      isbn2: '',
      isbn3: '',
      imageUrl1: '',
      imageUrl2: '',
      imageUrl3: '',
      star1: 0,
      star2: 0,
      star3: 0,
    };
    this.getBestSellersBooks = this.getBestSellersBooks.bind(this);
  }

  componentDidMount() {
    this.getBestSellersBooks(); // (//invoke with callback
    console.log('on line 30 in Hompepage', this.props.fetch);
  }

  getBestSellersBooks(callback) {
    // pass a callback here
    // implement fetch function only if done and i've got the data
    $.ajax({
      url: '/bestSellers',
      type: 'GET',
    })
    .done((result) => {
      //console.log("on line 26 in Hompepage", result.results);
      const books = result.results;

      // books.forEach((book, index) => {
      //   while(index <= 3) {
      //     const book + index = book;
      //     const title + index = (book + index).title;
      //   }

      });
      console.log(books);
      const book1 = books[0];
      const book2 = books[1];
      const book3 = books[2];
      const b1isbn = book1.isbns[0].isbn13 ? book1.isbns[0].isbn13 : null;
      const b2isbn = book2.isbns[0].isbn10 ? book1.isbns[0].isbn10 : null;
      const b3isbn = book3.isbns[0].isbn10 ? book1.isbns[0].isbn10 : null;
      const title1 = book1.title ? book1.title  : null ;
      const title2 = book2.title //? book2.title : null;
      console.log(title2);
      const title3 = book3.title ? "ASKGARYVEE" : book3.title;

        // console.log("on line 26 in Hompepage", result.results);
        const books = result.results;
        console.log(books);
        const book1 = books[0];
        const book2 = books[1];
        const book3 = books[2];
        const b1isbn = book1.isbns[0].isbn13;// ? book1.isbns[0].isbn13 : null;
        const b2isbn = book2.isbns[0].isbn13;// ? book1.isbns[0].isbn13 : null;
        const b3isbn = book3.isbns[0].isbn13;// ? book1.isbns[0].isbn13 : null;
        const title1 = book1.title ? 'I GIVE YOU MY BODY ...' : book1.title;
        const title2 = book2.title; // ? book2.title : null;
        console.log(title2);
        const title3 = book3.title ? 'ASKGARYVEE' : book3.title;

        if (b1isbn) {
        // console.log(b1isbn);
          this.props.fetch('book', b1isbn, (book) => {
            console.log('test', book);
            this.setState({
              imageUrl1: book.imageURL,
              star1: book.averageRating,
            });
          });
        }

        if (b2isbn) {
        // console.log(b1isbn);
          this.props.fetch('book', b2isbn, (book) => {
            console.log('test', book);
            this.setState({
              imageUrl2: book.imageURL,
              star2: book.averageRating,
            });
          });
        }
        if (b3isbn) {
        // console.log(b1isbn);
          this.props.fetch('book', b3isbn, (book) => {
            console.log('test', book);
            this.setState({
              imageUrl3: book.imageURL,
              star3: book.averageRating,
            });
          });
        }

        this.setState({
          bestSellerBook1: book1,
          bestSellerBook2: book2,
          bestSellerBook3: book3,
          // isbn1: b1isbn,
          // isbn2: b2isbn,
          // isbn3: b3isbn
        });
      })
      .fail((err) => {
        throw err;
      });
  }

  render() {
    return (
      <div>
        <h1> Literary Litten: The Rotten Tomatoes for Books</h1>
        <div>
          {this.state.bestSellerBook1
            ?
              <div>
                <img src={this.state.imageUrl1} />
                <div className="bookTitle1"> {this.state.bestSellerBook1.title} star: {this.state.star0}</div>
                <div className="bookTitle1"> {this.state.bestSellerBook1.author} </div>
                <div className="bookTitle1"> {this.state.bestSellerBook1.description} </div>
                <img src={this.state.imageUrl2} />
                <div className="bookTitle2"> {this.state.bestSellerBook2.title} </div>
                <div className="bookTitle2"> {this.state.bestSellerBook2.author} </div>
                <div className="bookTitle2"> {this.state.bestSellerBook2.description} </div>
                <img src={this.state.imageUrl3} />
                <div className="bookTitle3"> {this.state.bestSellerBook3.title} </div>
                <div className="bookTitle3"> {this.state.bestSellerBook3.author} </div>
                <div className="bookTitle3"> {this.state.bestSellerBook3.description} </div>
              </div>
          : 'loading ...'}
        </div>
      </div>
    );
  }
}

export default HomePage;


// {<div className="bookImages"> {this.state.image0} {this.state.image1} {this.state.image2}</div>
//              <div className="bookTitle" >{this.state.bestSellerBooks[0].title} stars: {this.state.star0}{this.state.bestSellerBooks[1].title} stars: {this.state.star1}{this.state.bestSellerBooks[2].title} stars:{this.state.star2}</div>
//              <div className="bookAuthor" >
//                {this.state.bestSellerBooks[0].author}
//                {this.state.bestSellerBooks[1].author}
//                {this.state.bestSellerBooks[2].author}
//              </div>
//              <div className="bookGenre" >      </div>
//              <div className="description">
//                {this.state.bestSellerBooks[0].description}
//                {this.state.bestSellerBooks[1].description}
//                {this.state.bestSellerBooks[2].description}
//              </div>}
