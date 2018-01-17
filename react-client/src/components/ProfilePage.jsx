import React from 'react';
import $ from 'jquery';
import User from './User.jsx';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: [], 
      login: {
        username: '',
        password: '',
        name: '',
      },
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.saveName = this.saveName.bind(this);
    this.saveUsername = this.saveUsername.bind(this);
    this.savePassword = this.savePassword.bind(this);
    this.renderView = this.renderView.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  componentDidMount() {
  }

  saveName(e) {
    const login = this.state.login;
    login.name = e;
    this.setState({ login });
  }
  saveUsername(e) {
    const login = this.state.login;
    login.username = e;
    this.setState({ login });
  }
  savePassword(e) {
    const login = this.state.login;
    login.password = e;
    this.setState({ login });
  }

  handleLogin() {
    $.ajax({
      url: '/login',
      type: 'POST',
      data: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      success: (data) => {
        if (data.type === 'success') {
          this.setState({ userProfile: data.userProfile });
        } else if (data.type === 'wrong password') {
          alert('Wrong Password: Try Again');
        } else {
          alert ('Invalid username: Try Again');
        }
        this.renderView();
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  handleLogout() {
    this.setState({ userProfile: [] });
    this.renderView();
  }

  handleSignup() {
    $.ajax({
      url: '/signup',
      type: 'POST',
      data: JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
        reviewedBooks: [],
        favoriteBooks: [],
      }),
      success: (data) => {
        console.log(data);
        if (data.type === 'success') {
          alert('User Profile Created! Login to continue');
        } else{
          alert('Oh no! That username is already taken. Try again!');
        }
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  changePassword() {
    // render a text box
    // go to server > db
    // edit pw field in db
    // return new user object
    // rerender page

  }

  renderView() {
    if (this.state.userProfile.length === 0) {
      return (
        <div>
          <div className="login">
            <label>
              Login
            </label>
            <input
              type="text"
              value={this.username}
              onChange={this.saveUsername}
              placeholder="Username"
            />
            <input
              type="password"
              value={this.password}
              onChange={this.savePassword}
              placeholder="Password"
            />
            <button onClick={this.handleLogin} > Login </button>
          </div>
          <div className="signup">
            <label>
              Signup
            </label>
            <input
              type="text"
              value={this.name}
              onChange={this.saveName}
              placeholder="Name"
            />
            <input
              type="text"
              value={this.username}
              onChange={this.saveUsername}
              placeholder="Username"
            />
            <input
              type="password"
              value={this.password}
              onChange={this.savePassword}
              placeholder="Password"
            />
            <button onClick={this.handleSignup} > Signup </button>
          </div>
        </div>
      );
    } else {
      let user = this.state.userProfile;
      return (
        <div className="userProfile">
          <User user={user} onClick={this.changePassword.bind(this)} />
          <button onClick={this.handleLogout} > Logout </button>
        </div>
      );
    }
  }

  render() {
    if (this.props.user.name){
      return (
        <div className="userProfile">
          <User user={this.props.user} onClick={this.changePassword.bind(this)} />
          <button onClick={this.handleLogout} > Logout </button>
        </div>
      );
    } else {
      return (
        <h3>
        Login to see your profile
        </h3>
      );
    }
  }
}

export default ProfilePage;
