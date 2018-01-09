import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import ProfilePage from './components/ProfilePage.jsx'
import BookPage from './components/BookPage.jsx'
import HomePage from './components/HomePage.jsx'
import Search from './components/Search.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: null,
      items: [],
      userProfile: [],
      selectedBook: [],
    }
  }

  componentDidMount() {
    this.fetch('user', 'dust_off', (user)=> {
      this.setState({
        userProfile: user
      })
    })
    this.fetch('book', '1234567890', (book)=> {
      this.setState({
        selectedBook: book
      })
    })
  }

  fetch(thing, id, cb) {
    console.log('FETCH');
    $.ajax({
      url: `/${thing}/${id}`,
      success: (data) => {
        cb(data)
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  changeView(event) {
    if(event.target.value) {
      var choice = event.target.value
    } else {
      choice = event;
    }
    this.setState({
      view: choice
    });
  }

  render () {
    return (
    <div>
    <Search fetch={this.fetch.bind(this)} />

      <div className="selections">
        Test Pages:
        <select onChange={this.changeView.bind(this)}>
          <option>Profile</option>
          <option>Book</option>
          <option>Null</option>
        </select>
      </div>


      <div className="main-view">
        {this.state.view === 'Book'
          ? <BookPage
            book={this.state.selectedBook}
            changeView={this.changeView.bind(this)}
          />
          : this.state.view === 'Profile'
            ? <ProfilePage
              props={'test'}
              changeView={this.changeView.bind(this)}
            />
            :
            <HomePage
              props={'test'}
              changeView={this.changeView.bind(this)}
            />
        }
      </div>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
