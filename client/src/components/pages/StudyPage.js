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
      plant: 0,
    };
  }

  componentDidMount() {
    // remember -- api calls go here!

    document.title = "Study Page";
    get(`/api/user`, { userId: this.props.userId }).then((user) => this.setState({ user: user }));
    get(`/api/plant/single`, { plant_id: this.props.plantId }).then((plant) => {
      console.log(plant);
      this.setState({ plant: plant });
    });
  }

  render() {
    return (
      <>
        <div className="StudyPage-container">
          {this.state.user && this.state.plant ? (
            <>
              <div className="StudyPage-plantContainer">
                <img src={PLANT_STAGES[this.state.plant.stage][this.state.plant.plantType]} />
              </div>
              <div className="StudyPage-infoContainer">
                <h1>{this.state.plant.plantName}</h1>
                <h2>{this.state.plant.subject}.</h2>
                <button className="StudyPage-studyButton"> start studying </button>
                <button className="StudyPage-studyButton"> log study time </button>
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
