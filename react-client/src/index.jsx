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

    //example load user by userName
    this.fetch('user', 'dust_off', (user)=> {
      this.setState({
        userProfile: user
      })
    })

    //example fetch from library by ISBN
    this.fetch('book', '1234567890', (book)=> {
      this.setState({
        selectedBook: book
      })
    })

    //Search Example //ALSO works with ISBN: 0316769177
    this.fetch('search', 'Catcher in the Rye', (search)=> {
      console.log(search);
    })
  }

  fetch(thing, id, cb) {
    $.ajax({
      url: `/${thing}/${id}`,
      success: (data) => {
        cb(data)
      },
      error: (err) => {
        console.log('err', err);
        console.log(this.state.selectedBook);
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
    <Search />
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
