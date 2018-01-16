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
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const User = props =>(
    <div>
    <Grid container spacing={24}>

          <Grid item xs={12} sm={6} className='UserPic'>
            <h2>Your Profile</h2>
            <Paper >

              
              <Grid container spacing={16}>
                <Grid item xs={8}  >
                  <img src='https://cdn1.iconfinder.com/data/icons/social-messaging-productivity-1-1/128/gender-female2-256.png' alt="" />
                </Grid>
                <Grid item xs={3}  >
                  <span className='user'>
                    Name : <br /> {props.user.name}
                  </span>
                  <br />
                  <span className='user'>
                    Username : <br /> {props.user.username} <br />
                  </span>
                  <Button 
                  raised
                  onClick={props.changePassword} >
                  Edit Profile
                  </Button> <br />
                </Grid>
                
              </Grid>
            </Paper>
            <h2>
              My Reviews
            </h2>
            <Paper >  
              <span>
              {props.user.favoriteBooks}
              </span>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <h2>
              My Bookshelf
            </h2>
            <Paper >  
              <span>
              {props.user.favoriteBooks}
              </span>


            </Paper>
          </Grid>
        </Grid>
          <div className="name">
  </div>
    </div>
    );


export default User;
