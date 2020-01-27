import React, { Component } from "react";
import { Link } from "react-router-dom";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

// This identifies your application to Google's authentication service
const GOOGLE_CLIENT_ID = "529894289409-jecjp2cbbu9hsu3fobsrc063mv19t99r.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-leftSide">
          <div className="NavBar-title">study garden </div>
          <div className="NavBar-linkContainer">
            {this.props.userId && (
              <div>
                <Link to={`/home/${this.props.userId}`} className="NavBar-link">
                  home
                </Link>
                <Link to={`/home/${this.props.userId}/newplant`} className="NavBar-link">
                  new plant
                </Link>
                <Link to={`/home/${this.props.userId}/archive`} className="NavBar-link">
                  archive
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* <div className="NavBar-rightSide">
          <div className="NavBar-name">
            hello, {this.props.name}
          </div>
        </div> */}

        <div className="NavBar-logout">
          {this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              render={(renderProps) => (
                <button onClick={renderProps.onClick} className="NavBar-googleButton u-pointer">
                  log out
                </button> //FIXME: font is wrong
              )}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              render={(renderProps) => (
                <button onClick={renderProps.onClick} className="NavBar-googleButton u-pointer">
                  log in
                </button> //FIXME: font is wrong
              )}
              className="NavBar-link NavBar-login"
            />
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
