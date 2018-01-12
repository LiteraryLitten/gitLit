import React from 'react';
import { Button, Paper } from 'material-ui';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      spacing: '16',
    };
    this.getBestSellersBooks = this.getBestSellersBooks.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
  }

  componentDidMount() {
    this.getBestSellersBooks();
  }

  fetch(thing, id, cb) {
    $.ajax({
      url: `/${thing}/${id}`,
      success: (data) => {
        cb(data);
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  getBestSellersBooks() {
    $.ajax({
      url: '/bestSellers',
      type: 'GET',
    })
      .done((result) => {
        // console.log(result);
        const books = result.results.slice(0, 3);
        // let i = 0;
        books.forEach((book) => {
          const isbn = book.isbns[0].isbn13;
          this.fetch('book', isbn, (goodReads) => {
            book.imageURL = goodReads.imageURL;
            book.averageRating = goodReads.averageRating;
            const tempState = this.state.books.slice();
            tempState.push(book);
            this.setState({
              books: tempState,
            });
            console.log(this.state.books);
          });
        });
      })
      .fail((err) => {
        throw err;
      });
  }

  handleUserClick() {
    console.log('I was clicked');
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;


    return (
      <div className={{ padding: '15px' }}>

        <Grid container>
          <Grid item xs={12}>
            <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
              {[0, 1, 2].map(value => (
                <Grid key={value} item>
                  <Paper className={classes.paper} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Button raised color="primary">
          Hello World
        </Button>

      </div>
    );
  }
}

export default withStyles(styles)(FrontPage);

// export default FrontPage;
