import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { post, get } from "../../utilities";

import ProgressBar from "../modules/ProgressBar.js";
import LogStudyTime from "../modules/LogStudyTime.js";
import "../../utilities.css";
import "./StudyPage.css";
import { PLANT_STAGES } from "../modules/PlantStages.js";
import Timer from "../modules/Timer.js";
class StudyPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      user: null,
      plant: undefined,
      session: undefined,
      elapsedTime: 0,
      elapsedTimeHold: 0,
      isStudying: false,
      timeString: "0:00",
      showModal: false,
    };
  }

  //TODO: make a timer, have corresponding UI pop up while study session is in progress
  async startStudy(event) {
    let sessionTimer = await new Timer(
      () => {
        this.elapsedTime++;
      },
      1000,
      123,
      true
    );
    this.setState({
      isStudying: true,
    });
    post(`/api/session/update`, {
      creatorId: this.props.userId,
      plantId: this.props.plantId,
      studySessionLength: 100, //in seconds, change to value of field in form
    });
    //TODO: link to api and call starting a new session
    //done
  }

  //only use if study session is ended via time expiry or a hypothetical end study session button

  logTime = (studySession) => {
    const newCumul = this.state.plant.studyTimeCumul + studySession.elapsedTime;
    //  console.log("studyTimeCumul:", this.state.plant.studyTimeCumul, studySession.elapsedTime);
    //  console.log("newCumul:", newCumul);
    post(`/api/plant/update`, {
      plantId: this.props.plantId,
      fields: {
        studyTimeCumul: newCumul,
      },
    }).then(
      this.setState({
        plant: {
          studyTimeCumul: newCumul,
        },
      })
    );
    //console.log("plant:", this.state.plant);
    //console.log("plant stage:", this.state.plant.stage);
  };

  showModal = (e) => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  componentDidMount() {
    // remember -- api calls go here!

    document.title = "Study Page";
    get(`/api/user`, { userId: this.props.userId }).then((user) => this.setState({ user: user }));
    get(`/api/plant/single`, { plantId: this.props.plantId }).then((plant) => {
      //  console.log(plant);
      this.setState({ plant: plant });
    });
    get(`/api/session`, { plantId: this.props.plantId }).then((session) => {
      this.setState({ session: session });
    });
    //for testing
    //this.startStudy(100);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.elapsedTime !== prevState.elapsedTime) {
      this.setState({
        timeString: this.convertToMinSec(this.state.elapsedTime),
      });
    }
    if (this.state.elapsedTime > this.state.elapsedTimeHold + 15) {
      //lets not kill the server too hard
      this.setState({
        elapsedTimeHold: this.state.elapsedTime,
      });
      const newCumul = this.state.plant.studyTimeCumul + this.state.elapsedTime;
      post(`/api/session/update`, {
        plantId: this.props.plantId,
        elapsedTime: this.state.elapsedTime,
      });
      post(`/api/plant/update`, {
        plantId: this.props.plantId,
        fields: {
          studyTimeCumul: newCumul,
        },
      }).then(
        this.setState({
          plant: {
            studyTimeCumul: newCumul,
          },
        })
      );
    }
  }
  convertToMinSec(sec) {
    let out = "";
    let seconds = () => {
      let res = sec % 60;
      if (res < 10) {
        return "0" + String(res);
      } else {
        return res;
      }
    };
    let minutes = sec / 60;
    out = String(Math.floor(minutes)) + ":" + String(seconds());
    this.setState({
      timeString: out,
    });
  }

  //TODO: buttons/popups for continuing or cancelling existing study session
  render() {
    if (this.state.isStudying !== true && this.state.plant) {
      return (
        <>
          <div className="StudyPage-container">
            {this.state.user && this.state.plant ? (
              <>
                <div className="StudyPage-plantContainer">
                  <img
                    src={PLANT_STAGES[this.state.plant.stage][this.state.plant.plantType]}
                    className=".StudyPage-plant"
                  />
                </div>
                <div className="StudyPage-infoContainer">
                  <h2>{this.state.plant.plantName}</h2>
                  <h3>{this.state.plant.subject}.</h3>
                  <button className="StudyPage-studyButton u-pointer" onClick={this.startStudy}>
                    start studying
                  </button>
                  <button
                    className="StudyPage-studyButton u-pointer"
                    onClick={(e) => {
                      this.showModal();
                    }}
                  >
                    log study time
                  </button>
                  <LogStudyTime
                    showModal={this.state.showModal}
                    onClose={this.showModal}
                    userId={this.props.userId}
                    plantId={this.props.plantId}
                    plant={this.state.plant}
                    logTime={this.logTime}
                  />
                  <ProgressBar className="StudyPage-progressBar" />
                </div>
              </>
            ) : (
              <div className="u-loadingDark"> Loading... </div>
            )}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="StudyPage-container">
            {this.state.user && this.state.plant ? (
              <>
                <div className="StudyPage-plantContainer">
                  <img
                    src={PLANT_STAGES[this.state.plant.stage][this.state.plant.plantType]}
                    className=".StudyPage-plant"
                  />
                </div>
                <div className="StudyPage-infoContainer">
                  <div>{this.state.timeString}</div>
                  <button className="StudyPage-studyButton u-pointer" onClick={null}>
                    you should be studying right now!
                  </button>
                  <button
                    className="StudyPage-studyButton u-pointer"
                    onClick={(e) => {
                      this.showModal();
                    }}
                  >
                    you can't log study time because you're studying!
                  </button>
                  <LogStudyTime
                    showModal={this.state.showModal}
                    onClose={this.showModal}
                    userId={this.props.userId}
                    plantId={this.props.plantId}
                    plant={this.state.plant}
                    logTime={this.logTime}
                  />
                  <ProgressBar className="StudyPage-progressBar" />
                </div>
              </>
            ) : (
              <div className="u-loadingDark"> Loading... </div>
            )}
          </div>
        </>
      );
    }
  }
}

export default StudyPage;
