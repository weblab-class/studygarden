import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import flowerDecor from "../../../img/peJQgf0.png";
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
      console.log(this.props.handleLogin);
      return (
        <>
        
          <div className="LoginPage-container">
            {/* <svg width="2000" height="2500" version="2.0" className="u-pattern" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id= "polka" viewBox="0,0,100,100" width="10%" height="10%">
                  <circle cx="0" cy="0" r="20" stroke="#FFD1E0" fill="#FFD1E0" stroke-width="0"/>
                </pattern>
              </defs>
              <circle cx="0" cy="0" r="1000" stroke="#000000" fill="#000" stroke-width="0"/>
            </svg> */}
            {/* <svg viewBox="0 0 100% 100%" xmlns="http://www.w3.org/2000/svg" className="u-pattern">
              <defs>
                <pattern id="circle" width="200" height="200" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <circle cx="30" cy="30" r="30" stroke="#FFD1E0" fill="#FFD1E0" stroke-width="0"/>
                </pattern>
              </defs>

              <circle cx="50"  cy="50" r="50" fill="url(#circle)"/>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#circle)"/>
              <circle cx="180" cy="50" r="40" fill="none" stroke-width="20" stroke="url(#star)"/>
            </svg> */}
            <h1 className="LoginPage-title"> study garden </h1>
            {this.props.userId ? (
              <GoogleLogout
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={this.props.handleLogout}
                onFailure={(err) => console.log(err)}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    className="LoginPage-googleButton u-pointer"
                  >
                    Logout
                  </button> //FIXME: font is wrong
                )}
              />
            ) : (
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.props.handleLogin}
                onFailure={(err) => console.log(err)}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    className="LoginPage-googleButton u-pointer"
                  >
                    Log In With Google
                  </button>
                )}
              />
            )}
            <div className="footer">
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
