import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import MenuIcon from 'material-ui-icons/Menu';
import Search from './Search.jsx';
import Login from './Login.jsx';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    textTransform: 'none',
  },
  dark: {
    backgroundColor: '#caa052',
  },
  def: { background: '#ffd180' },
  light: { background: '#ffffb1' },
  text: { color: '#FFFFFF' },
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleBookPageClick = this.handleBookPageClick.bind(this);
  }

  handleHomeClick() {
    this.props.handleMenuBarClick(null);
  }

  handleBookPageClick() {
    this.props.handleMenuBarClick('Book');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" style={styles.dark}>
          <Toolbar>

            <Button className={classes.button} color="contrast" name="Literary Litten" onClick={this.handleHomeClick}>
              <Typography type="title" color="inherit" className={classes.flex}>
              Literary Litten
              </Typography>
            </Button>
            {/* <Button className={classes.button} color="contrast" name="Book Page" onClick={this.handleBookPageClick}>
              Book Page
            </Button> */}
            <Typography type="title" color="inherit" className={classes.flex} />

            <Search fetch={this.props.fetch} handleSearch={this.props.handleSearch} />
            <Login
              description="login"
              setUserProfile={this.props.setUserProfile}
              user={this.props.user}
              handleProfileClick={this.props.handleProfileClick}
              handleLogout={this.props.handleLogout}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
