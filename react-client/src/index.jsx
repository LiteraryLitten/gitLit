import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import ProfilePage from './components/ProfilePage.jsx';
import BookPage from './components/BookPage.jsx';
import HomePage from './components/HomePage.jsx';
import NavBar from './components/NavBar.jsx';
import { Rating } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: null,
      items: [],
      userProfile: { username: 'Dust-Off' },
      selectedBook: {},
    };
    this.changeView = this.changeView.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  //
  //componentDidMount() {
    // example load user by userName
    // this.fetch('user', 'dust_off', (user) => {
    //   this.setState({
    //     userProfile: user,
    //   });
    // });

  fetch(thing, id, cb) {
    $.ajax({
      url: `/${thing}/${id}`,
      success: (data) => {
        cb(data);
      },
      error: (err) => {
        console.log('err', err);
        cb(null);
      },
    });
  }

  changeView(choice, book) {
    console.log('changing view');
    // console.log(choice, book);
    if (book) {
      this.setState({
        selectedBook: book,
      });
    }
    this.setState({
      view: choice,
    });
  }

  submitReview(review, isbn13, rating) {
    const user = this.state.userProfile.username;
    const data = {
      review, user, isbn13, rating,
    };
    console.log('inside the APP @ 50', data);

    fetch('/review', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  }

  handleSearch() {
    this.setState({ view: 'Search' });
    console.log('IN INDEX.JSX');
    this.renderView();
  }

  renderView() {
    if (this.state.view === 'Book') {
      return (
        <BookPage
          book={this.state.selectedBook}
          changeView={this.changeView}
          fetch={this.fetch}
          submitReview={this.submitReview}
        />
      );
    } else if (this.state.view === 'Profile') {
      return (
        <ProfilePage
          fetch={this.fetch}
          changeView={this.changeView}
        />
      );
    } else if (this.state.view === 'Search') {
      return (
        <SearchPage
          fetch={this.fetch}
          changeView={this.changeView}
        />
      );
    }
    return (
      <HomePage
        changeView={this.changeView}
        fetch={this.fetch}
        view={this.state.view}
      />
    );
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <Rating icon="heart" defaultRating={1} maxRating={3} />

        {/* <NavBar changeView={this.changeView} />
=======
        <NavBar changeView={this.changeView} fetch={this.fetch} handleSearch={this.handleSearch} />
>>>>>>> rendering search page
        <div className="main-view">
          {this.renderView()}
        </div> */}
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
