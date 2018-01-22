import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import renderHTML from 'react-render-html';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Bookshelf from './Bookshelf.jsx';
import EditProfile from './EditProfile.jsx';
import Reviewshelf from './Reviewshelf.jsx';
import UploadProfilePicture from './UploadProfilePicture.jsx';

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
            <br />
            <Typography type='display1'>
              My Profile
            </Typography>
            <br />
            <Paper >

              
              <Grid container spacing={16}>
                <Grid item xs={8}  >

                  <UploadProfilePicture currentUser={props.user.name}/>

                </Grid>
                <Grid item xs={3}  >
                  <span className='user'>
                    Name : <br /> {props.user.name}
                  </span>
                  <br />
                  <span className='user'>
                    Username : <br /> {props.user.username} <br />
                  </span>
                  
                  <EditProfile currentUser={props.user.name} setUserProfile={props.setUserProfile} />
                
                </Grid>
                
              </Grid>
            </Paper>
            <br />
            <Typography type='display1'>
              My Reviews
            </Typography>
            <br />
              <Reviewshelf books={props.user.reviewedBooks} fetch={props.fetch} changeView={props.changeView} user={props.user} key='reviews'/>
          </Grid>

          <Grid item xs={12} sm={6}>
            <br />
            <Typography type='display1'>
              My Bookshelf
            </Typography>
            <br />
            <Paper >  
              <Bookshelf books={props.user.favoriteBooks} fetch={props.fetch} changeView={props.changeView} key='liked'/>
            </Paper>
          </Grid>
        </Grid>
          <div className="name">
  </div>
    </div>
    );


export default User;
