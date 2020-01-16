import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import NewPlantInput from "../modules/NewPlantInput.js";

import "../../utilities.css";
import "./HomePage.css";

class NewPlantPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
    document.title = "Create New Plant";
    get(`/api/user`, { userId: this.props.userId }).then((user) => this.setState({ user: user }));
    //why not get user in app.js and pass it down as prop?

    //get("/api/plant",
  }

  render() {
    return (
      <>
        <NewPlantInput />
      </>
    );

    /* {
    if (!this.state.user) {
      return <div> Please Log In! </div>;
    } else {
      return (
        <>
          <h1>Welcome, {user.name}!</h1>
          <h2> see your garden here.</h2>
        </>
      );
    }
  } */
  }
}

export default NewPlantPage;
