import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import renderHTML from 'react-render-html';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Rating from './Rating.jsx';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  pic: {
    textAlign: 'center',
  },
  p: {
    backgroundColor: 'lightgrey',
  },
  note: {
    textAlign: 'right',
  },
});

const User = props =>(
    <div>
    <Grid container spacing={24}>
          <Grid item xs={1} />

          <Grid item xs sm={2} className='UserPic'>
            <img src='https://cdn1.iconfinder.com/data/icons/rcons-user-action/512/users_woman-512.png' />
          </Grid>

          <Grid item xs sm={7}>
            <Paper >
              <span className='user'>
                Name : {props.user.name}
              </span>
              <br />
              <span className='user'>
                Username : {props.user.username} <br />
              </span>
              <Button 
              raised
              onClick={props.changePassword} >
              Change Password
              </Button> <br />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} />
        </Grid>
          <div className="name">
    My Bookshelf : {props.user.favoriteBooks} <br />
    My Reviews : {props.user.reviewedBooks}
  </div>
    </div>
    );


export default User;
