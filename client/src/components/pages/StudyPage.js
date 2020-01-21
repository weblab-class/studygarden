import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";

import ProgressBar from "../modules/ProgressBar.js";
import "../../utilities.css";
import "./StudyPage.css";
import { PLANT_STAGES } from "../modules/PlantStages.js";

class StudyPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      user: null,
      plant: undefined,
      session: undefined,
    };
  }

  componentDidMount() {
    // remember -- api calls go here!

    document.title = "Study Page";
    get(`/api/user`, { userId: this.props.userId }).then((user) => this.setState({ user: user }));
    get(`/api/plant/single`, { plantId: this.props.plantId }).then((plant) => {
      console.log(plant);
      this.setState({ plant: plant });
    });
    get(`/api/session`, { plantId: this.props.plantId }).then((session) => {
      this.setState({ session: session });
    });
  }
  //TODO: make a timer, have corresponding UI pop up while study session is in progress
  startStudy = async () => {
    //TODO: link to api and call starting a new session
  };

  logTime = async () => {
    //TODO: link to api and update cumulative study timer
  };

  //TODO: buttons/popups for continuing or cancelling existing study session
  render() {
    return (
      <>
        <div className="StudyPage-container">
          {this.state.user && this.state.plant ? (
            <>
              <div className="StudyPage-plantContainer">
                <img
                  src={PLANT_STAGES[this.state.plant.stage][this.state.plant.plantType]}
                  className="StudyPage-plant"
                />
              </div>
              <div className="StudyPage-infoContainer">
                <h2>{this.state.plant.plantName}</h2>
                <h3>{this.state.plant.subject}.</h3>
                <button className="StudyPage-studyButton" onClick={this.startStudy}>
                  start studying
                </button>
                <button className="StudyPage-studyButton" onClick={this.logTime}>
                  log study time
                </button>
                <ProgressBar className="StudyPage-progressBar" />
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
