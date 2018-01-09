import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: []
    }
  }

  componentDidMount() {

  }

  render () {
    return (
      <div>
      <h1>User Name:</h1>
    </div>)
  }
}

export default ProfilePage;
