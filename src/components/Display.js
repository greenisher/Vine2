import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { isLoggedIn } from '../utils/AuthService';
import { CloudinaryContext, Transformation, Video } from 'cloudinary-react';
import axios from 'axios';
import { Share } from 'react-twitter-widgets'

class Display extends Component {

    state = { videos: [] };

    getVideos() {
        axios.get('http://res.cloudinary.com/dokznppbe/video/list/vine.json')
        .then(res => {
          console.log(res.data.resources);
          this.setState({ videos: res.data.resources});
  });
}

componentDidMount() {
  this.getVideos();
}

render() {

  const { videos }  = this.state;

  return (
    <div>
      <Nav />
      <h3 className="text-center"> Latest Vines </h3>
      <hr/>

      <div className="video-container">
        <CloudinaryContext cloudName="dokznppbe">
          { videos.map((data, index) => (
              <div className="individual-vine" key={index}>
                <div className="embed-responsive embed-responsive-4by3">
                  <Video publicId={data.public_id} width="350" height="350" controls></Video>
                </div>
                <div> Uploaded by {data.created_at} </div>
                <Share url={`http://res.cloudinary.com/dokznppbe/video/upload/${data.public_id}.mp4`} />


              </div>
            ))
          }
        </CloudinaryContext>
      </div>
    </div>
  );
}
}

export default Display;