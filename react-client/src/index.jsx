import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ProfilePage from './components/ProfilePage.jsx';
import BookPage from './components/BookPage.jsx';
import HomePage from './components/HomePage.jsx';
import Search from './components/Search.jsx';
import NavBar from './components/NavBar.jsx';
import { Rating } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: null,
      items: [],
      userProfile: [],
      selectedBook: [],
    };
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
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

  changeView(choice) {
    this.setState({
      view: choice,
    });
  }

  renderView() {
    if (this.state.view === 'Book') {
      return (
        <BookPage
          book={this.state.selectedBook}
          changeView={this.changeView}
          fetch={this.fetch}
        />
      );
    } else if (this.state.view === 'Profile') {
      return (
        <ProfilePage
          // props="test"
          fetch={this.fetch}
          changeView={this.changeView}
        />
      );
    }
    return (
      <HomePage
        // props="test"
        changeView={this.changeView}
        fetch={this.fetch}
      />
    );
  }

  render() {
    return (
      <div>
        <Rating icon="heart" defaultRating={1} maxRating={3} />

        {/* <NavBar changeView={this.changeView} />
        <div className="main-view">
          {this.renderView()}
        </div> */}
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
