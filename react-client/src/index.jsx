import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

import ProfilePage from './components/ProfilePage.jsx';
import BookPage from './components/BookPage.jsx';
import HomePage from './components/HomePage.jsx';
import NavBar from './components/NavBar.jsx';
import SearchPage from './components/SearchPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // view: null,
      view: null,
      items: [],
      // // sample user to build bookshelf:
      // userProfile: {
      //   name: 'user',
      //   username: 'user',
      //   favoriteBooks: [9780399169274],
      //   reviewedBooks: [9780399169274],
      // },
      userProfile : {},
      selectedBook: {},
      proreviews: [],
    };
    this.changeView = this.changeView.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.setUserProfile = this.setUserProfile.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleMenuBarClick = this.handleMenuBarClick.bind(this);
    this.getProReviews = this.getProReviews.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
  }

  getProReviews(isbn, callback) {
      axios.get(`/proreviews/${isbn}`)
      .then((response) => {
        console.log(response);
        callback(response);
      })
      .catch((error) => {
        console.log('ProReviews are not received', error);
      });
  }

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

  handleMenuBarClick(e) {
    this.setState({ view: e });
    this.renderView();
  }

  updateUserData(userProfile) {
    // console.log('in updateUserData @ 64', userProfile);
    this.setState({
      userProfile: userProfile,
    });
  }

  submitReview(review, isbn13, rating) {
    const user = this.state.userProfile.username;
    const data = {
      review, user, isbn13, rating,
    };
    // console.log('inside the APP @ 50', data);

    fetch('/review', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then((response) => {
        // console.log('Success:', response);
        this.updateUserData(response[1]);
      });
  }

  handleSearch(query) {
    // do the fetch here
    // pass that data into the search page
    this.setState({ view: 'Search', searchedBook: query }, function () {
      // console.log(this.state.searchedBook);
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
    this.setState({ userProfile: user }, () => {
      console.log('Setting this.state.userProfile:', this.state.userProfile);
      this.renderView();
    });
  }

  handleLogout() {
    this.setState({ userProfile: {} });
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
          getProReviews={this.getProReviews}
          userProfile={this.state.userProfile}
          updateUserData={this.updateUserData}
        />
      );
    } else if (this.state.view === 'Profile') {
      return (
        <ProfilePage
          fetch={this.fetch}
          changeView={this.changeView}
          userProfile={this.state.userProfile}
          updateUserData={this.updateUserData}
        />
      );
    } else if (this.state.view === 'Search') {
      return (
        <SearchPage
          fetch={this.fetch}
          changeView={this.changeView}
          searchedBook={this.state.searchedBook}
          searchResults={this.state.searchResults}
          userProfile={this.state.userProfile}
          updateUserData={this.updateUserData}
        />
      );
    }
    return (
      <HomePage
        changeView={this.changeView}
        fetch={this.fetch}
        view={this.state.view}
        getProReviews={this.getProReviews}
        userProfile={this.state.userProfile}
        updateUserData={this.updateUserData}
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
          handleMenuBarClick={this.handleMenuBarClick}

        />
        <div style={{ padding: '25px', width: '100%' }} />
        <div className="main-view">
          {this.renderView()}
        </div>
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
