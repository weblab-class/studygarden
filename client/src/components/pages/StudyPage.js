import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { post, get } from "../../utilities";
import ProgressBar from "../modules/ProgressBar.js";
import LogStudyTime from "../modules/LogStudyTime.js";
import EnterSessionLength from "../modules/EnterSessionLength.js";
import "../../utilities.css";
import "./StudyPage.css";
import { PLANT_STAGES } from "../modules/PlantStages.js";
import Timer from "../modules/Timer.js";
import MiniDaemon from "../modules/MiniDaemon.js";

class StudyPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    // ALL TIME IS IN SECONDS
    this.state = {
      user: null,
      plant: undefined,
      session: undefined,
      elapsedTime: 0,
      elapsedTimeHold: 0,
      isStudying: false,
      timeString: "0:00",
      showModalLog: false,
      showModalStart: false,
      sessionLength: 0,
    };
    this.startStudy = this.startStudy.bind(this);
    this.stopStudy = this.stopStudy.bind(this);
    let nMiniDaemon;
  }

  //TODO: make a timer, have corresponding UI pop up while study session is in progress
  startStudy = (sesLength) => {
    // let sessionTimer = new Timer(
    //   () => {
    //     console.log("uno");
    //     this.setState((prevState) => ({ elapsedTime: prevState.elapsedTime + 1 }));
    //   },
    //   1000,
    //   123,
    //   true
    // );
    //let a = await sessionTimer.tick()
    //console.log(a+"b")
    this.setState({
      timeString: this.convertToMinSec(sesLength),
    });
    this.nMiniDaemon = new MiniDaemon(
      this,
      (index, length, backwards) => {
        console.log("uno");
        this.setState({ elapsedTime: index });
      },
      1000,
      sesLength
    );

    this.setState({
      isStudying: true,
      sessionLength: sesLength,
    });

    this.nMiniDaemon.start();
    post(`/api/session/update`, {
      creatorId: this.props.userId,
      plantId: this.props.match.params.plantId,
      studySessionLength: sesLength, //in seconds, change to value of field in form
    });
    //TODO: link to api and call starting a new session
    //done
  };
  stopStudy() {
    this.nMiniDaemon.pause();
  }

  //only use if study session is ended via time expiry or a hypothetical end study session button
  //needs rewrite bc im bad
  logTime = (studySession) => {
    const newCumul = this.state.plant.studyTimeCumul + Number(studySession.elapsedTime);
    const newStage = Math.min(4, Math.floor((newCumul / this.state.plant.goalTime) * 5));
    //  console.log("studyTimeCumul:", this.state.plant.studyTimeCumul, studySession.elapsedTime);
    //  console.log("newCumul:", newCumul);
    post(`/api/plant/update`, {
      plantId: this.props.match.params.plantId,
      fields: {
        studyTimeCumul: newCumul,
        stage: newStage,
      },
    }).then(
      this.setState((prevState, prevProps) => {
        let out = prevState.plant;

        out["studyTimeCumul"] = newCumul;
        out["stage"] = newStage;
        return { plant: out };
      })
    );
    //console.log("plant:", this.state.plant);
    //console.log("plant stage:", this.state.plant.stage);
  };

  showModalLog = (e) => {
    this.setState({
      showModalLog: !this.state.showModalLog,
    });
  };

  showModalSession = (e) => {
    this.setState({
      showModalSession: !this.state.showModalSession,
    });
  };

  componentDidMount() {
    // remember -- api calls go here!

    document.title = "Study Page";
    get(`/api/user`, { userId: this.props.match.params.userId }).then((user) =>
      this.setState({ user: user })
    );
    get(`/api/plant/single`, { plantId: this.props.match.params.plantId }).then((plant) => {
      console.log(plant);

      this.setState({ plant: plant });
    });
    get(`/api/session`, { plantId: this.props.match.params.plantId }).then((session) => {
      this.setState({ session: session });
    });
    //for testing
    //this.startStudy(100);
    get("/api/whoami").then((user) => {
      if (!user._id) {
        this.setState({ isLoggedOut: false }); //change back to true
      }else{
        this.setState({ isLoggedOut: false }); //and remove this
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.elapsedTime !== prevState.elapsedTime) {
      this.setState({
        timeString: this.convertToMinSec(this.state.sessionLength - this.state.elapsedTime),
      });
    }
    if (this.state.elapsedTime > this.state.elapsedTimeHold + 5) {
      //lets not kill the server too hard
      //update stage and cumulative study time every so often while studying
      this.setState({
        elapsedTimeHold: this.state.elapsedTime,
      });
      const newCumul = this.state.plant.studyTimeCumul + this.state.elapsedTime;
      const newStage = Math.min(4, Math.floor((newCumul / this.state.plant.goalTime) * 5));

      post(`/api/session/update`, {
        plantId: this.props.match.params.plantId,
        elapsedTime: this.state.elapsedTime,
      });
      post(`/api/plant/update`, {
        plantId: this.props.match.params.plantId,
        fields: {
          studyTimeCumul: newCumul,
          stage: newStage,
        },
      }).then(
        this.setState((prevState, prevProps) => {
          let out = prevState.plant;
          out["studyTimeCumul"] = newCumul;
          out["stage"] = newStage;
          return { plant: out };
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
    return out;
  }

  //TODO: buttons/popups for continuing or cancelling existing study session
  render() {
    if (this.state.isLoggedOut) {
      console.log("is logged out!");
      return <Redirect to="/" />;
    }
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
                  <h2 className = "StudyPage-plantTitle">{this.state.plant.plantName}</h2>
                  <h3 className = "StudyPage-plantSubject">{this.state.plant.subject}.</h3>
                  <button
                    className="StudyPage-studyButton u-pointer"
                    onClick={(e) => {
                      this.showModalSession();
                    }}
                  >
                    start studying
                  </button>
                  <EnterSessionLength
                    showModal={this.state.showModalSession}
                    onClose={this.showModalSession}
                    userId={this.props.userId}
                    plantId={this.props.match.params.plantId}
                    plant={this.state.plant}
                    startStudy={this.startStudy}
                  />
                  <button
                    className="StudyPage-studyButton u-pointer"
                    onClick={(e) => {
                      this.showModalLog();
                    }}
                  >
                    log study time
                  </button>
                  <LogStudyTime
                    showModal={this.state.showModalLog}
                    onClose={this.showModalLog}
                    userId={this.props.userId}
                    plantId={this.props.match.params.plantId}
                    plant={this.state.plant}
                    logTime={this.logTime}
                  />
                  <ProgressBar
                    className="StudyPage-progressBar"
                    studyTimeCumul={this.state.plant.studyTimeCumul}
                    goalTime={this.state.plant.goalTime}
                  />
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
                  <button className="StudyPage-studyButton u-pointer" onClick={this.stopStudy}>
                    stop studying
                  </button>

                  <ProgressBar
                    className="StudyPage-progressBar"
                    studyTimeCumul={this.state.plant.studyTimeCumul}
                    goalTime={this.state.plant.goalTime}
                  />
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
