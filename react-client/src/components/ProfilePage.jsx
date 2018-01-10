import React from 'react';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: [],
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>User Name:</h1>
      </div>
    );
  }
}

export default ProfilePage;
