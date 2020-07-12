import React, { Component } from 'react';
// import 'whatwg-fetch';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import './home.scss'
// import { pic } from './signup.png'
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div id="App">
      <div id="page-wrap">
      <div className="home">
        <div className="signup-image">
          <h1 className="mainTitle">Step 1: Sign Up</h1>
          <img className="homeImage" src="../../../assets/img/signup.png" alt="" />
        </div>
        <p>
          The first step to joining our amazing community of open source collaboration
          is to create an account with us. You can use Google, Facebook, or Github to
          create an account or just do it the old fashioned way with an email.
        </p>
        <Link className="actionButton" to='/signup'>SIGN UP</Link>
        <div className="upload-image">
          <h1 className="mainTitle">Step 2: Upload Resume</h1>
          <img className="homeImage"  src="../../../assets/img/upload.png" alt="" />
        </div>
        <p>
          The next step is to upload your resume. We recommend using a .pdf or .png and removing
          any personal information ( IE phone number, address, email) that you don't want the public to see. 
          
        </p>
        <div className="review-image">
          <h1 className="mainTitle">Step 3: Get Sweet Reviews</h1>
          <img className="homeImage"  src="../../../assets/img/review2.png" alt="" />
        </div>
        <p className="bottomParagraph">
          Once your resume is uploaded our community will begin to add notes and reviews. 
          Suggestions can be upvoted if people agree with them. 
          From there you can reformat your resume and being to apply to jobs,
          or repost it and seek additional reviews.
          Get started now:
          <br/>
          <br/>
          <Link className="actionButton" to='/signup'>SIGN UP</Link>
        </p>

        

      </div>
      </div>
      </div>

    );
  }

}

export default Home;
