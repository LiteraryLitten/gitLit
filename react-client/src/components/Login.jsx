import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import renderHTML from 'react-render-html';
import TextField from 'material-ui/TextField';
import $ from 'jquery';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      login: {
        name: '',
        username: '',
        password: '',
      },
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.saveName = this.saveName.bind(this);
    this.saveUsername = this.saveUsername.bind(this);
    this.savePassword = this.savePassword.bind(this);
    this.onNameClick = this.onNameClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  saveName(e) {
    const login = this.state.login;
    login.name = e.target.value;
    this.setState({ login });
  }

  saveUsername(e) {
    const login = this.state.login;
    login.username = e.target.value;
    this.setState({ login });
  }

  savePassword(e) {
    const login = this.state.login;
    login.password = e.target.value;
    this.setState({ login });
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleLogin() {
    $.ajax({
      url: '/login',
      type: 'POST',
      data: JSON.stringify({
        username: this.state.login.username,
        password: this.state.login.password,
      }),
      success: (data) => {
        if (data.type === 'success') {
          this.setState({ userProfile: data.userProfile });
        } else if (data.type === 'wrong password') {
          alert('Wrong Password: Try Again');
        } else {
          alert ('Invalid username: Try Again');
        }
        //this.renderView();
        this.props.setUserProfile(this.state.userProfile);
        this.setState({ open: false });
      },
      error: (err) => {
        console.log('err', err);
      },
    });
    
  }

  handleSignup() {
    $.ajax({
      url: '/signup',
      type: 'POST',
      data: JSON.stringify({
        name: this.state.login.name,
        username: this.state.login.username,
        password: this.state.login.password,
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

  onNameClick() {
    this.props.handleProfileClick();
  }

  onLogoutClick() {
    this.props.handleLogout();
  }

  render() {
    if (this.props.user.hasOwnProperty('username')) {
      return (
        <div>
            <Button color="contrast" onClick={this.onNameClick}>{this.props.user.name}</Button>
            <Button color="contrast" onClick={this.onLogoutClick}>Logout</Button>
        </div>
      );
    } else {
      return (
        <div>

            <Button color="contrast" onClick={this.handleClickOpen}>Login</Button>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            transition={Transition}
          >
            <DialogTitle id="form-dialog-title">Login/Signup</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Log In
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="username"
                type="string"
                onChange={this.saveUsername}
              />
              <TextField
                autoFocus
                margin="dense"
                id="login-password"
                label="password"
                type="password"
                onChange={this.savePassword}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleLogin} color="primary">
                Login
              </Button>
            </DialogActions>
            <DialogContent>
              <DialogContentText>
                Sign Up
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="name"
                type="string"
                onChange={this.saveName}
              />
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="username"
                type="string" 
                onChange={this.saveUsername}
              />
              <TextField
                autoFocus
                margin="dense"
                id="signup-password"
                label="password"
                type="password"
                onChange={this.savePassword}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleSignup} color="primary">
                Signup
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }






      
  }
}

export default Login;
