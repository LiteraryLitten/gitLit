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


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      description: "test",
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>

          <Button color="contrast" onClick={this.handleClickOpen}>Login</Button>
        {/* <Button onClick={this.handleClickOpen}>Open alert dialog</Button> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
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
            />
            <TextField
              autoFocus
              margin="dense"
              id="login-password"
              label="password"
              type="password"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
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
            />
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="username"
              type="string"
            />
            <TextField
              autoFocus
              margin="dense"
              id="signup-password"
              label="password"
              type="password"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Signup
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Login;
