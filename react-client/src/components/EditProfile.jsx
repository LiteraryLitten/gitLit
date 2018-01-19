import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import renderHTML from 'react-render-html';
import TextField from 'material-ui/TextField';
import $ from 'jquery';


class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      user: {
        name: '',
        username: '',
      },
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    // this.handleLogin = this.handleLogin.bind(this);
    // this.handleSignup = this.handleSignup.bind(this);
    // this.saveName = this.saveName.bind(this);
    // this.saveLoginUsername = this.saveLoginUsername.bind(this);
    // this.saveLoginPassword = this.saveLoginPassword.bind(this);
    // this.saveSignupUsername = this.saveSignupUsername.bind(this);
    // this.saveSignupPassword = this.saveSignupPassword.bind(this);
    // this.onNameClick = this.onNameClick.bind(this);
    // this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  saveName(e) {
    const signup = this.state.signup;
    signup.name = e.target.value;
    this.setState({ signup });
  }

  saveUsername(e) {
    const username = this.state.username;
    login.username = e.target.value;
    this.setState({ login });
  }

  // saveSignupUsername(e) {
  //   const signup = this.state.signup;
  //   signup.username = e.target.value;
  //   this.setState({ signup });
  // }

  // saveLoginPassword(e) {
  //   const login = this.state.login;
  //   login.password = e.target.value;
  //   this.setState({ login });
  // }

  // saveSignupPassword(e) {
  //   const signup = this.state.signup;
  //   signup.password = e.target.value;
  //   this.setState({ signup });
  // }

  handleClickOpen() {
    this.setState({ open: true });
  }

  // handleLogin() {
  //   $.ajax({
  //     url: '/login',
  //     type: 'POST',
  //     data: JSON.stringify({
  //       username: this.state.login.username,
  //       password: this.state.login.password,
  //     }),
  //     success: (data) => {
  //       if (data.type === 'success') {
  //         this.setState({ userProfile: data.userProfile });
  //       } else if (data.type === 'wrong password') {
  //         alert('Wrong Password: Try Again');
  //       } else {
  //         alert ('Invalid username: Try Again');
  //       }
  //       //this.renderView();
  //       this.props.setUserProfile(this.state.userProfile);
  //       this.setState({ open: false });
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     },
  //   });
    
  // }


  // onNameClick() {
  //   this.props.handleProfileClick();
  // }


  render() {
    
      return (
        <div>

            <Button  onClick={this.handleClickOpen}>Edit Profile</Button>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Edit name/username
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="string"
                // onChange={this.saveLoginUsername}
              />
              <TextField
                autoFocus
                margin="dense"
                id="login-password"
                label="Username"
                type="string"
                // onChange={this.saveLoginPassword}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleEditProfile} color="primary">
                Edit Profile
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
  }
}

export default EditProfile;