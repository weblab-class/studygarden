import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";

import ProgressBar from "../modules/ProgressBar.js";
import "../../utilities.css";
import "./StudyPage.css";
import { PLANT_STAGES } from "../modules/PlantStages.js";
import Timer from "../modules/Timer.js"
class StudyPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      user: null,
      plant: undefined,
      session: undefined,
      elapsedTime: 0, 
      isStudying: false,
      timeString: "0:00",
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
    get(`/api/session`, {plantId: this.props.plantId}).then((session) => {
      this.setState({session: session });
    });
    //for testing
    //this.startStudy(100);
  }

  //TODO: make a timer, have corresponding UI pop up while study session is in progress
  async startStudy(event) {
    let sessionTimer = await new Timer(()=>{this.elapsedTime++},1000,123,true);
    this.setState({
      isStudying: true
    })
    //TODO: link to api and call starting a new session
  }

  componentDidUpdate(prevProps,prevState){
    if (this.state.elapsedTime !== prevState.elapsedTime){
      this.setState({
        timeString: this.convertToMinSec(this.state.elapsedTime),
      })
    }
  }
  convertToMinSec(sec){
    let out = ""
    let seconds = () => {
      let res = sec%60
      if (res < 10){
        return "0"+String(res)
      }else{
        return res
      }
    }
    let minutes = sec/60
    out = String(Math.floor(minutes)) + ":" + String(seconds())
    this.setState({
      timeString: out
    });
  }

  logTime = async () => {
    //TODO: link to api and update cumulative study timer
  }
  
//TODO: buttons/popups for continuing or cancelling existing study session
  render() {
    if(this.state.isStudying !== true){
      return (
        <>
          <div className="StudyPage-container">
            {this.state.user && this.state.plant ? ( 
              <>
                <div className="StudyPage-plantContainer">
                  <img src={PLANT_STAGES[this.state.plant.stage][this.state.plant.plantType]} />
                </div>
                <div className="StudyPage-infoContainer">
                  <h1>name!</h1>
                  <h2>subject.</h2>
                  <button className="StudyPage-studyButton u-pointer" onClick = {this.startStudy}> start studying </button>
                  <button className="StudyPage-studyButton u-pointer" onClick = {this.logTime}> log study time </button>
                  <ProgressBar className="StudyPage-progressBar" />
                </div>
              </>
            ) : (
              <div className="u-loadingDark"> Loading... </div>
            )}
          </div>
        </>
      );
    }else{
      return (
        <>
          <div className="StudyPage-container">
            {this.state.user && this.state.plant ? ( 
              <>
                <div className="StudyPage-plantContainer">
                  <img src={PLANT_STAGES[this.state.plant.stage][this.state.plant.plantType]} />
                </div>
                <div className="StudyPage-infoContainer">
                  <div>{this.state.timeString}</div>
                  <button className="StudyPage-studyButton u-pointer" onClick = {null}> :0 </button>
                  <button className="StudyPage-studyButton u-pointer" onClick = {null}> :( </button>
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
