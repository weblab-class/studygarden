import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";

import "../../utilities.css";
import "./StudyPage.css";

class StudyPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
    document.title = "Study Page";
    get(`/api/user`, { userId: this.props.userId }).then((user) => this.setState({ user: user }));
    //why not get user in app.js and pass it down as prop?
  }

  render() {
    return (
      <>
        <div className="StudyPage-container">
          {this.state.user ? (
            <>
              <div className="StudyPage-infoContainer">
                <h1>name!</h1>
                <h2>subject.</h2>
                <button className="StudyPage-studyButton"> start studying </button>
                <button className="StudyPage-studyButton"> log study time </button>
                <div>progress bar goes here, probably as separate component</div>
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

export default StudyPage;
