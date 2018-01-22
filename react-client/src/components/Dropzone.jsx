import React from 'react';
import { Image } from 'cloudinary-react';

const Dropzone = (props) => {
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return(
    <div>
      {this.state.uploadedFileCloudinaryUrl === '' ? null :
      <div>
        <img src={props.uploadedFileCloudinaryUrl} />
      </div>}
    </div>
  );
};

export default Dropzone;
