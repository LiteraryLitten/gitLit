import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = {
  root: {
    display: 'flex',
  },
  popperClose: {
    pointerEvents: 'none',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenueButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick() {
    this.setState({ open: !this.state.open });
  }

  handleClose(e) {
    this.props.changeView(e);
    console.log('MenueButton', e);
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Manager>
          <Target>
            <IconButton
              className={classes.menuButton}
              color="contrast"
              aria-label="Menu"
              aria-owns={open ? 'menu-list' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow in={open} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  <MenuList role="menu">
                    <MenuItem onClick={() => { this.handleClose('null'); }}>Home</MenuItem>
                    <MenuItem onClick={() => { this.handleClose('Profile'); }}>Profile</MenuItem>
                    <MenuItem onClick={() => { this.handleClose('Book'); }}>Book</MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

MenueButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenueButton);
