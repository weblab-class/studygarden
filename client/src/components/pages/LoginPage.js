import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import flowerDecor from "../../../img/peJQgf0.png"
import "../../utilities.css";
import "./LoginPage.css";

const GOOGLE_CLIENT_ID = "529894289409-jecjp2cbbu9hsu3fobsrc063mv19t99r.apps.googleusercontent.com";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      hideNavBar: true,
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    if (!this.state.user) {
      return (
        <>
          <div className="LoginPage-container">
            <div className="footer">
              <h1 className="LoginPage-title"> study garden </h1>
              {this.props.userId ? (
                <GoogleLogout
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Logout"
                  onLogoutSuccess={this.props.handleLogout}
                  onFailure={(err) => console.log(err)}
                  render={(renderProps) => (
                    <button onClick={renderProps.onClick} className="LoginPage-googleButtonu-pointer">
                      Logout
                    </button> //FIXME: font is wrong
                  )}
                  className="LoginPage-googleButton"
                />
              ) : (
                <GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Login"
                  onSuccess={this.props.handleLogin}
                  onFailure={(err) => console.log(err)}
                  render={(renderProps) => (
                    <button onClick={renderProps.onClick} className="LoginPage-googleButton u-pointer">
                      Log In With Google
                    </button> //FIXME: font is wrong
                  )}
                  className="LoginPage-googleButton" 
                />
              )}
              <img src={flowerDecor} />
            </div>
            <br />
          </div>
        </>
      );
    }
  }
}

export default LoginPage;
