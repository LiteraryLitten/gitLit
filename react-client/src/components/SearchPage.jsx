import React from 'react';
import $ from 'jquery';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';

import BookCard from './BookCard.jsx';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderPage = this.renderPage;
  }

  componentDidMount() {
  }

  renderPage(){
    if(this.props.searchResults) {
      console.log(this.props.searchResults);
      this.props.searchResults.forEach((result) => {
        const book = {
          title: result.best_book.title._text,
          author: result.best_book.author.name._text,
          imageURL: result.best_book.image_url._text,
          description: 'NA',
          genres: ['NA'],
        };
        // return (<BookCard book={book} />);
        return (book);
      });
      //get the necessary book data
      //send it to BookCard
    }
  }

  render() {
    var searchCards = [];

    if(this.props.searchResults) {
      console.log(this.props.searchResults);
      this.props.searchResults.forEach((result) => {
        const book = {
          title: result.best_book.title._text,
          author: result.best_book.author.name._text,
          imageURL: result.best_book.image_url._text,
          description: 'NA',
          genres: ['none'],
        };
        searchCards.push(book);
      });
      return (
      <div>
        <h2>SEARCH RESULTS</h2> <br />
        <Grid
          container
          justify="center"
        >
          {searchCards.map((book) =>(
            <BookCard key={book.title} book={book} changeView={this.props.changeView}/>
            // <span key={book.title}>{JSON.stringify(book)}</span>
          ))}
        </Grid>
      </div>
    );
    }

    return (
      <div>
        <h2>LOADING SEARCH RESULTS</h2> <br />
        
      </div>
    );
  }
}

export default withStyles(styles)(SearchPage);
