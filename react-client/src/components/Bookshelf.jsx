import React from 'react';

const Bookshelf = props => (
  <div className="name">
    Name : {props.user.name} <br />
    Username : {props.user.username} <br />
    <button onClick={props.changePassword} > Change Password </button> <br />
    My Bookshelf : {props.user.favoriteBooks} <br />
    My Reviews : {props.user.reviewedBooks}
  </div>
);

export default Bookshelf;
