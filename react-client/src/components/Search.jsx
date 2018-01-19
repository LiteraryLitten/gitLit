import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import SearchPage from './SearchPage.jsx';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // bind the fetch callback to this component
  // accept a callback that returns the isbn of the first result or the selected one to APP
  // the CB will set the state of the currentbook in the APP and trigger a re-render of the book page

  onChange(e) {
    this.setState({
      query: e.target.value,
    });
  }

  handleSubmit() {
    // this.props.fetch('search', this.state.query, (book) => {
    //   this.setState({
    //     selectedBook: book,
    //   });
    // });

    // const data = [{"id":{"_attributes":{"type":"integer"},"_text":"4640799"},"books_count":{"_attributes":{"type":"integer"},"_text":"548"},"ratings_count":{"_attributes":{"type":"integer"},"_text":"5123586"},"text_reviews_count":{"_attributes":{"type":"integer"},"_text":"80954"},"original_publication_year":{"_attributes":{"type":"integer"},"_text":"1997"},"original_publication_month":{"_attributes":{"type":"integer"},"_text":"6"},"original_publication_day":{"_attributes":{"type":"integer"},"_text":"26"},"average_rating":{"_text":"4.45"},"best_book":{"_attributes":{"type":"Book"},"id":{"_attributes":{"type":"integer"},"_text":"3"},"title":{"_text":"Harry Potter and the Sorcerer's Stone (Harry Potter, #1)"},"author":{"id":{"_attributes":{"type":"integer"},"_text":"1077326"},"name":{"_text":"J.K. Rowling"}},"image_url":{"_text":"https://images.gr-assets.com/books/1474154022m/3.jpg"},"small_image_url":{"_text":"https://images.gr-assets.com/books/1474154022s/3.jpg"}}},{"id":{"_attributes":{"type":"integer"},"_text":"2402163"},"books_count":{"_attributes":{"type":"integer"},"_text":"417"},"ratings_count":{"_attributes":{"type":"integer"},"_text":"2062318"},"text_reviews_count":{"_attributes":{"type":"integer"},"_text":"38765"},"original_publication_year":{"_attributes":{"type":"integer"},"_text":"1999"},"original_publication_month":{"_attributes":{"type":"integer"},"_text":"7"},"original_publication_day":{"_attributes":{"type":"integer"},"_text":"8"},"average_rating":{"_text":"4.53"},"best_book":{"_attributes":{"type":"Book"},"id":{"_attributes":{"type":"integer"},"_text":"5"},"title":{"_text":"Harry Potter and the Prisoner of Azkaban (Harry Potter, #3)"},"author":{"id":{"_attributes":{"type":"integer"},"_text":"1077326"},"name":{"_text":"J.K. Rowling"}},"image_url":{"_text":"https://images.gr-assets.com/books/1499277281m/5.jpg"},"small_image_url":{"_text":"https://images.gr-assets.com/books/1499277281s/5.jpg"}}},{"id":{"_attributes":{"type":"integer"},"_text":"6231171"},"books_count":{"_attributes":{"type":"integer"},"_text":"24"},"ratings_count":{"_attributes":{"type":"integer"},"_text":"2005792"},"text_reviews_count":{"_attributes":{"type":"integer"},"_text":"36676"},"original_publication_year":{"_attributes":{"type":"integer"},"_text":"1998"},"original_publication_month":{"_attributes":{"type":"integer"},"_text":"7"},"original_publication_day":{"_attributes":{"type":"integer"},"_text":"2"},"average_rating":{"_text":"4.38"},"best_book":{"_attributes":{"type":"Book"},"id":{"_attributes":{"type":"integer"},"_text":"15881"},"title":{"_text":"Harry Potter and the Chamber of Secrets (Harry Potter, #2)"},"author":{"id":{"_attributes":{"type":"integer"},"_text":"1077326"},"name":{"_text":"J.K. Rowling"}},"image_url":{"_text":"https://images.gr-assets.com/books/1474169725m/15881.jpg"},"small_image_url":{"_text":"https://images.gr-assets.com/books/1474169725s/15881.jpg"}}},{"id":{"_attributes":{"type":"integer"},"_text":"2963218"},"books_count":{"_attributes":{"type":"integer"},"_text":"16"},"ratings_count":{"_attributes":{"type":"integer"},"_text":"1933147"},"text_reviews_count":{"_attributes":{"type":"integer"},"_text":"53753"},"original_publication_year":{"_attributes":{"type":"integer"},"_text":"2007"},"original_publication_month":{"_attributes":{"type":"integer"},"_text":"7"},"original_publication_day":{"_attributes":{"type":"integer"},"_text":"21"},"average_rating":{"_text":"4.62"},"best_book":{"_attributes":{"type":"Book"},"id":{"_attributes":{"type":"integer"},"_text":"136251"},"title":{"_text":"Harry Potter and the Deathly Hallows (Harry Potter, #7)"},"author":{"id":{"_attributes":{"type":"integer"},"_text":"1077326"},"name":{"_text":"J.K. Rowling"}},"image_url":{"_text":"https://images.gr-assets.com/books/1474171184m/136251.jpg"},"small_image_url":{"_text":"https://images.gr-assets.com/books/1474171184s/136251.jpg"}}},{"id":{"_attributes":{"type":"integer"},"_text":"3046572"},"books_count":{"_attributes":{"type":"integer"},"_text":"318"},"ratings_count":{"_attributes":{"type":"integer"},"_text":"1947895"},"text_reviews_count":{"_attributes":{"type":"integer"},"_text":"33056"},"original_publication_year":{"_attributes":{"type":"integer"},"_text":"2000"},"original_publication_month":{"_attributes":{"type":"integer"},"_text":"7"},"original_publication_day":{"_attributes":{"type":"integer"},"_text":"8"},"average_rating":{"_text":"4.53"},"best_book":{"_attributes":{"type":"Book"},"id":{"_attributes":{"type":"integer"},"_text":"6"},"title":{"_text":"Harry Potter and the Goblet of Fire (Harry Potter, #4)"},"author":{"id":{"_attributes":{"type":"integer"},"_text":"1077326"},"name":{"_text":"J.K. Rowling"}},"image_url":{"_text":"https://images.gr-assets.com/books/1361482611m/6.jpg"},"small_image_url":{"_text":"https://images.gr-assets.com/books/1361482611s/6.jpg"}}},{"id":{"_attributes":{"type":"integer"},"_text":"2809203"},"books_count":{"_attributes":{"type":"integer"},"_text":"318"},"ratings_count":{"_attributes":{"type":"integer"},"_text":"1913124"},"text_reviews_count":{"_attributes":{"type":"integer"},"_text":"30383"},"original_publication_year":{"_attributes":{"type":"integer"},"_text":"2003"},"original_publication_month":{"_attributes":{"type":"integer"},"_text":"6"},"original_publication_day":{"_attributes":{"type":"integer"},"_text":"21"},"average_rating":{"_text":"4.47"},"best_book":{"_attributes":{"type":"Book"},"id":{"_attributes":{"type":"integer"},"_text":"2"},"title":{"_text":"Harry Potter and the Order of the Phoenix (Harry Potter, #5)"},"author":{"id":{"_attributes":{"type":"integer"},"_text":"1077326"},"name":{"_text":"J.K. Rowling"}},"image_url":{"_text":"https://images.gr-assets.com/books/1507396732m/2.jpg"},"small_image_url":{"_text":"https://images.gr-assets.com/books/1507396732s/2.jpg"}}},{"id":{"_attributes":{"type":"integer"},"_text":"41335427"},"books_count":{"_attributes":{"type":"integer"},"_text":"291"},"ratings_count":{"_attributes":{"type":"integer"},"_text":"1865156"},"text_reviews_count":{"_attributes":{"type":"integer"},"_text":"29023"},"original_publication_year":{"_attributes":{"type":"integer"},"_text":"2005"},"original_publication_month":{"_attributes":{"type":"integer"},"_text":"7"},"original_publication_day":{"_attributes":{"type":"integer"},"_text":"16"},"average_rating":{"_text":"4.54"},"best_book":{"_attributes":{"type":"Book"},"id":{"_attributes":{"type":"integer"},"_text":"1"},"title":{"_text":"Harry Potter and the Half-Blood Prince (Harry Potter, #6)"},"author":{"id":{"_attributes":{"type":"integer"},"_text":"1077326"},"name":{"_text":"J.K. Rowling"}},"image_url":{"_text":"https://images.gr-assets.com/books/1361039191m/1.jpg"},"small_image_url":{"_text":"https://images.gr-assets.com/books/1361039191s/1.jpg"}}},{"id":{"_attributes":{"type":"integer"},"_text":"2962492"},"books_count":{"_attributes":{"type":"integer"},"_text":"84"},"ratings_count":{"_attributes":{"type":"integer"},"_text":"211757"},"text_reviews_count":{"_attributes":{"type":"integer"},"_text":"6646"},"original_publication_year":{"_attributes":{"type":"integer"},"_text":"1998"},"original_publication_month":{"_attributes":{"type":"integer","nil":"true"}},"original_publication_day":{"_attributes":{"type":"integer","nil":"true"}},"average_rating":{"_text":"4.74"},"best_book":{"_attributes":{"type":"Book"},"id":{"_attributes":{"type":"integer"},"_text":"862041"},"title":{"_text":"Harry Potter Boxset (Harry Potter, #1-7)"},"author":{"id":{"_attributes":{"type":"integer"},"_text":"1077326"},"name":{"_text":"J.K. Rowling"}},"image_url":{"_text":"https://images.gr-assets.com/books/1392579059m/862041.jpg"},"small_image_url":{"_text":"https://images.gr-assets.com/books/1392579059s/862041.jpg"}}},{"id":{"_attributes":{"type":"integer"},"_text":"48765776"},"books_count":{"_attributes":{"type":"integer"},"_text":"109"},"ratings_count":{"_attributes":{"type":"integer"},"_text":"444617"},"text_reviews_count":{"_attributes":{"type":"integer"},"_text":"56194"},"original_publication_year":{"_attributes":{"type":"integer"},"_text":"2016"},"original_publication_month":{"_attributes":{"type":"integer"},"_text":"7"},"original_publication_day":{"_attributes":{"type":"integer"},"_text":"31"},"average_rating":{"_text":"3.73"},"best_book":{"_attributes":{"type":"Book"},"id":{"_attributes":{"type":"integer"},"_text":"29056083"},"title":{"_text":"Harry Potter and the Cursed Child - Parts One and Two (Harry Potter, #8)"},"author":{"id":{"_attributes":{"type":"integer"},"_text":"5042201"},"name":{"_text":"John Tiffany"}},"image_url":{"_text":"https://images.gr-assets.com/books/1470082995m/29056083.jpg"},"small_image_url":{"_text":"https://images.gr-assets.com/books/1470082995s/29056083.jpg"}}},{"id":{"_attributes":{"type":"integer"},"_text":"21457570"},"books_count":{"_attributes":{"type":"integer"},"_text":"6"},"ratings_count":{"_attributes":{"type":"integer"},"_text":"27402"},"text_reviews_count":{"_attributes":{"type":"integer"},"_text":"914"},"original_publication_year":{"_attributes":{"type":"integer"},"_text":"2005"},"original_publication_month":{"_attributes":{"type":"integer"},"_text":"1"},"original_publication_day":{"_attributes":{"type":"integer"},"_text":"1"},"average_rating":{"_text":"4.73"},"best_book":{"_attributes":{"type":"Book"},"id":{"_attributes":{"type":"integer"},"_text":"10"},"title":{"_text":"Harry Potter Collection (Harry Potter, #1-6)"},"author":{"id":{"_attributes":{"type":"integer"},"_text":"1077326"},"name":{"_text":"J.K. Rowling"}},"image_url":{"_text":"https://images.gr-assets.com/books/1328867351m/10.jpg"},"small_image_url":{"_text":"https://images.gr-assets.com/books/1328867351s/10.jpg"}}}];
    // this.props.handleSearch(data);
    this.props.handleSearch(this.state.query);
  }

  render() {
    const { classes } = this.props;

    return (
      <span>
        <Button
          raised
          dense
          color="default"
          className={classes.button}
          disabled={this.state.query.length < 1}
          onClick={this.handleSubmit}
        >
          {this.state.query.length < 1 ? '' : 'Search'}
        </Button>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Search"
          margin="normal"
          onChange={this.onChange}
        />
      </span>
    );
  }
}

export default withStyles(styles)(Search);
