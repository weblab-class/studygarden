import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { post , get } from "../../utilities";

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
      elapsedTimeHold: 0, 
      isStudying: false,
      timeString: "0:00",
    };
    this.startStudy=this.startStudy.bind(this);
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

  incrementTime(){
    this.setState((prevstate) => ({
      elapsedTime: prevstate.elapsedTime+1}
      )); 
  }

  //TODO: make a timer, have corresponding UI pop up while study session is in progress
  async startStudy() {
    let sessionTimer = await new Timer(this.incrementTime(),1000,123 /*hard coded*/,true);
    //console.log(this)
    
    this.setState({
      isStudying: true
    })
    // post(`/api/session/update`, {
    //   creatorId: this.props.userId,
    //   plantId: this.props.plantId,
    //   studySessionLength: 100, //in seconds, change to value of field in form    
    // });
    //TODO: link to api and call starting a new session 
    //done
  };
  

  isStudying(){
    this.setState({
      isStudying: true
    })
  }

  componentDidUpdate(prevProps,prevState){
    console.log(this.state.elapsedTime+"1212");
    if (this.state.elapsedTime !== prevState.elapsedTime){
      this.setState({
        timeString: this.convertToMinSec(this.state.elapsedTime),
      })
    }
    // if (this.state.elapsedTime > this.state.elapsedTimeHold + 15){
    //   //lets not kill the server too hard
    //   this.setState({
    //     elapsedTimeHold: this.state.elapsedTime,
    //   })
    //   const newCumul=this.state.plant.studyTimeCumul + this.state.elapsedTime;
    //   post(`/api/session/update`, {
    //     plantId: this.props.plantId, 
    //     elapsedTime: this.state.elapsedTime});
    //   post(`/api/plant/update`, {
    //     plantId: this.props.plantId, 
    //     fields: {
    //       studyTimeCumul: newCumul}
    //     }).then(
    //     this.setState({
    //       plant: {
    //         studyTimeCumul: newCumul
    //       },
    //     })
    //   );
    // }
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


  //only use if study session is ended via time expiry or a hypothetical end study session button
  //TODO write an actual log time function oops
  logTime = () => {
    const newCumul=this.state.plant.studyTimeCumul + this.state.elapsedTime;
    post(`/api/plant/update`, {
      plantId: this.props.plantId, 
      fields: {
        studyTimeCumul: newCumul
      },
    }).then(
      this.setState({
        plant: {
          studyTimeCumul: newCumul
        },
      })
    );
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
