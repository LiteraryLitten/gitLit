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
import MenueButton from './MenueButton.jsx';
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
};

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MenueButton changeView={props.changeView} />
          
          <Button className={classes.button} color="contrast" label="Literary Litten">
            <Typography type="title" color="inherit" className={classes.flex}>
            Literary Litten
            </Typography>
          </Button>
          <Typography type="title" color="inherit" className={classes.flex}>
              
          </Typography>
          <Button className={classes.button} color="contrast" label="Book Page">
            Book Page
          </Button>
          <Search fetch={props.fetch} handleSearch={props.handleSearch} />
          <Login
            description="login"
            setUserProfile={props.setUserProfile}
            user={props.user}
            handleProfileClick={props.handleProfileClick}
            handleLogout={props.handleLogout}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
