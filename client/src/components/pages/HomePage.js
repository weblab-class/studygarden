import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";

import "../../utilities.css";
import "./HomePage.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
    document.title = "Profile Page";
    get(`/api/user`, { userId: this.props.userId }).then((user) => this.setState({ user: user }));
  }

  render() 
    {return (
      <>
      {this.props.userId ? (
        <>
        <h1>Good luck on your project :)</h1>
        <h2> What we provide in this skeleton</h2>
        <ul>
          <li>Google Auth (Skeleton.js & auth.js)</li>
          <li>Socket Infrastructure (client-socket.js & server-socket.js)</li>
          <li>User Model (auth.js & user.js)</li>
        </ul>
        <h2> What you need to change</h2>
        <ul>
          <li>Change the font in utilities.css</li>
          <li>Change the Frontend CLIENT_ID for Google Auth (Skeleton.js)</li>
          <li>Change the Server CLIENT_ID for Google Auth (auth.js)</li>
          <li>Change the Database SRV for Atlas (server.js)</li>
          <li>Change the Database Name for MongoDB (server.js)</li>
          <li>Add a favicon to your website at the path client/dist/favicon.ico</li>
          <li>Update website title in client/dist/index.html</li>
        </ul>
      </>):(<div> Please Log In! </div>)}
      </>
  )
  
  /* {
    if (!this.state.user) {
      return <div> Please Log In! </div>;
    } else {
      return (
        <>
          <h1>Good luck on your project :)</h1>
          <h2> What we provide in this skeleton</h2>
          <ul>
            <li>Google Auth (Skeleton.js & auth.js)</li>
            <li>Socket Infrastructure (client-socket.js & server-socket.js)</li>
            <li>User Model (auth.js & user.js)</li>
          </ul>
          <h2> What you need to change</h2>
          <ul>
            <li>Change the font in utilities.css</li>
            <li>Change the Frontend CLIENT_ID for Google Auth (Skeleton.js)</li>
            <li>Change the Server CLIENT_ID for Google Auth (auth.js)</li>
            <li>Change the Database SRV for Atlas (server.js)</li>
            <li>Change the Database Name for MongoDB (server.js)</li>
            <li>Add a favicon to your website at the path client/dist/favicon.ico</li>
            <li>Update website title in client/dist/index.html</li>
          </ul>
        </>
      );
    }
  } */
}
};

export default HomePage;
