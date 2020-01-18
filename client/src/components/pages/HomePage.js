import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import { navigate } from "@reach/router";
import initialBench from "../../../img/initialBench.png";

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
        <div className="HomePage-container">
          {this.state.user ? (
            <>
              <div className="HomePage-text">
                <h1>Welcome, {this.state.user.name}!</h1>
                <h2>see your garden here.</h2>{" "}
              </div>
              <div className="HomePage-windowsill">
                <img src={initialBench} />
              </div>
            </>
          ) : (
            <div> Loading... </div>
          )}
        </div>
      </>
    );
  }
}

export default HomePage;
