import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import { navigate } from "@reach/router";

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
    //why not get user in app.js and pass it down as prop?
  }

  render() {
    return (
      <>
        {this.state.user ? (
          <>
            <h1>Welcome!</h1>
            <h2>see your garden here.</h2>
          </>
        ) : (
          <div> Please Log In! </div>
        )}
      </>
    );
  }
}

export default HomePage;
