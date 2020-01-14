import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./LoginPage.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "529894289409-jecjp2cbbu9hsu3fobsrc063mv19t99r.apps.googleusercontent.com";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    if (!this.state.user) {
      return (
        <>
          <div className="LoginPage-container">
            <h1 className="LoginPage-title"> study garden </h1>
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="LoginPage-loginLink"
            />
          </div>
        </>
      );
    }
  }
}

export default LoginPage;
