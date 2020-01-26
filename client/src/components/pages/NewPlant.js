import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import NewPlantInput from "../modules/NewPlantInput.js";
import { Redirect } from "react-router-dom";
import PlantSlider from "../modules/PlantSlider.js";

import "../../utilities.css";
import "./NewPlant.css";

class NewPlantPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      user: null,
      currentIndex: 0,
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
    document.title = "Create New Plant";
    get("/api/whoami").then((user) => {
      if (!user._id) {
        this.setState({ isLoggedOut: true });
      }
    });
    get(`/api/user`, { userId: this.props.match.params.userId }).then((user) => this.setState({ user: user }));
    //why not get user in app.js and pass it down as prop?

    //get("/api/plant",
    
  }

  setPlantType = (ind) => {
    this.setState({
      currentIndex: ind,
    });
    //console.log(ind);
  };

  render() {
    if (this.state.isLoggedOut) {
      console.log("is logged out!");
      return <Redirect to="/" />;
    }
    return (
      <>
        <div className="NewPlant-container u-no-select">
        <svg viewBox="0 0 100% 100%" xmlns="http://www.w3.org/2000/svg" className="u-pattern">
              <defs>
                <pattern id="circle" width="200" height="200" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <circle cx="45" cy="45" r="30" fill="rgba(255,209,224,0.5)" stroke-width="0"/>
                </pattern>
              </defs>

              {/* <circle cx="50" cy="50" r="50" fill="url(#circle)"/> */}
              <rect x="0" y="0" width="100%" height="100%" fill="url(#circle)"/>
              {/* <circle cx="180" cy="50" r="40" fill="none" stroke-width="20" stroke="url(#star)"/> */}
            </svg>
          <NewPlantInput
            plantType={this.state.currentIndex}
            userId={this.props.match.params.userId}
          />
          <PlantSlider setPlantType={this.setPlantType} currentIndex={this.state.currentIndex} />
        </div>
      </>
    );
  }
}

export default NewPlantPage;
