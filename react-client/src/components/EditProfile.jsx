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
import axios from 'axios';


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
    this.handleClose = this.handleClose.bind(this);
    this.saveName = this.saveName.bind(this);
    this.saveUsername = this.saveUsername.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
  }

  saveName(e) {
    const user = this.state.user;
    user.name = e.target.value;
    // console.log(user.name);
    this.setState({ user });
  }

  saveUsername(e) {
    const username = this.state.user;
    username.username = e.target.value;
    this.setState({ username });
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleEditProfile() {
    axios({
      method: 'put',
      url: '/editprofile',
      data: {
        user: this.state.user.name,
        username: this.state.user.username, 
      }
    })
      .then((response) => {
        alert('Your Profile has been updated');
        console.log('Profile is updated');
      })
      .catch((error) => {
        console.log('There is an error', error);
      })
  }


  render() {
    
      return (
        <div>

            <Button raised onClick={this.handleClickOpen}>Edit Profile</Button>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Edit your name/username
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="string"
                onChange={this.saveName}
              />
              <TextField
                autoFocus
                margin="dense"
                id="login-password"
                label="Username"
                type="string"
                onChange={this.saveUsername}
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