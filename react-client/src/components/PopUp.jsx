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


class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      description: this.props.description,
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
        <ExpandMoreIcon onClick={this.handleClickOpen} />
        {/* <Button onClick={this.handleClickOpen}>Open alert dialog</Button> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Description</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {renderHTML(this.state.description)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default PopUp;