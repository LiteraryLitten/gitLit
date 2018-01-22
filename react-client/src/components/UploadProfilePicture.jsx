import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { CloudinaryContext, Transformation } from 'cloudinary-react';


const CLOUDINARY_UPLOAD_PRESET = 'wijqkahk';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/laracloud/upload';

class UploadProfilePicture extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	file: null,
    	publicId: '',
      uploadedFileCloudinaryUrl: '',
    };

    this.submit = this.submit.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
  }

  onImageDrop(files) {
    this.setState({
      file: files[0],
    });
  }

  submit() {
    const { file, uploadedFileCloudinaryUrl } = this.state;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
    	method: 'post',
    	url: CLOUDINARY_UPLOAD_URL,
    	headers: {
    		'Content-Type': 'application/x-www-form-urlencoded',
    	},
    	data: formData,
    })
      .then((response) => {
      	console.log(response.data);
      	this.setState({
      		publicId: response.data.public_id,
      		uploadedFileCloudinaryUrl: response.data.secure_url,
      	});
      })
      .catch((error) => {
      	console.log('File has not been uploaded', error);
      });
  }

  render() {
  	return (
    <div>
      {this.state.uploadedFileCloudinaryUrl === '' ?

        <div>
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop}
          >
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
          <button onClick={this.submit}>Submit</button>
        </div>
		    :
        <div style={{ maxWidth: '210px' }} className="profilePicture">
          <img id="cloudPic" src={this.state.uploadedFileCloudinaryUrl} />
        </div>}
    </div>
  	);
  }
}

export default UploadProfilePicture;
