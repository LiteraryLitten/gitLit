import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import ProfilePage from './components/ProfilePage.jsx'
import BookPage from './components/BookPage.jsx'
import HomePage from './components/HomePage.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: null,
      items: [],
      userProfile: []
    }
  }

  componentDidMount() {
    this.findUser('dust_off', (user)=> {
      this.setState({
        userProfile: user
      })
    })
    // $.ajax({
    //   url: '/items',
    //   success: (data) => {
    //     this.setState({
    //       items: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }

  findUser(user, cb) {
    $.ajax({
      url: `/user/${user}`,
      success: (data) => {
        cb(data)
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  changeView(event) {
    var choice = event.target.value
    this.setState({
      view: choice
    });
  }

  render () {
    return (
    <div>


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
            props={'test'}
          />
          : this.state.view === 'Profile'
            ? <ProfilePage
              props={'test'}
            />
            :
            <HomePage
              props={'test'}
            />
        }
      </div>
      
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
