import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import NewPlantInput from "../modules/NewPlantInput.js";

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
    get(`/api/user`, { userId: this.props.userId }).then((user) => this.setState({ user: user }));
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
    return (
      <>
        <div className="NewPlant-container u.no-select">
          <NewPlantInput plantType={this.state.currentIndex} userId={this.props.userId} />
          <PlantSlider setPlantType={this.setPlantType} currentIndex={this.state.currentIndex} />
        </div>
      </>
    );
  }
}

export default NewPlantPage;
