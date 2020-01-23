import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../pages/StudyPage.css";
class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  hr(time){
    const out = time === 1 ? "hour" : "hours"
    return out
  }

  render() {
    const width =
      this.props.studyTimeCumul/(60**2) >= this.props.goalTime
        ? "100%"
        : "" + (this.props.studyTimeCumul/(60**2) * 100) / this.props.goalTime + "%";
    const style = {
      width: width,
    };
    //  console.log(width);
    //console.log(style);
    return (
      <div className="ProgressBar-container">
        <div className="ProgressBar" style={style}>
          <div className="ProgressBar-studyTime">{Math.round(10*(this.props.studyTimeCumul/(60**2)))/10} {this.hr(Math.round(10*(this.props.studyTimeCumul/(60**2)))/10)}</div>
        </div>
        <div className="ProgressBar-goal">{this.props.goalTime} {this.hr(this.props.goalTime)}</div>
      </div>
    );
  }
}

export default ProgressBar;
