import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import ProfilePage from './components/ProfilePage.jsx';
import BookPage from './components/BookPage.jsx';
import HomePage from './components/HomePage.jsx';
import NavBar from './components/NavBar.jsx';
import SearchPage from './components/SearchPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: null,
      items: [],
      userProfile: {},
      selectedBook: {},
    };
    this.changeView = this.changeView.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.setUserProfile = this.setUserProfile.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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

  handleSearch(query) {
    //do the fetch here
    //pass that data into the search page


    this.setState({ view: 'Search', searchedBook: query }, function () {
      console.log(this.state.searchedBook);
      this.fetch('search', this.state.searchedBook, (results) => {
        this.setState({
          searchResults: results,
        }, function () {
          this.renderView();
        });
      });
    });
  }

  setUserProfile(user) {
    this.setState({ userProfile: user }, function() { this.renderView(); });
  }

  handleLogout() {
    this.setState({ userProfile: {} });
  }

  changePassword() {
    // render a text box
    // go to server > db
    // edit pw field in db
    // return new user object
    // rerender page

  }

  handleProfileClick() {
    this.setState({ view: 'Profile' });
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
          user={this.state.userProfile}
        />
      );
    } else if (this.state.view === 'Search') {
      return (
        <SearchPage
          fetch={this.fetch}
          changeView={this.changeView}
          searchedBook={this.state.searchedBook}
          searchResults={this.state.searchResults}
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
        <NavBar
          changeView={this.changeView}
          fetch={this.fetch}
          handleSearch={this.handleSearch}
          setUserProfile={this.setUserProfile}
          user={this.state.userProfile}
          handleProfileClick={this.handleProfileClick}
          handleLogout={this.handleLogout}
        />
        <div className="main-view">
          {this.renderView()}
        </div>
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
