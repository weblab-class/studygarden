import React, { Component } from "react";
import { Link } from "@reach/router";
import "../pages/StudyPage.css";
class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const width =
      this.props.studyTimeCumul >= this.props.goalTime
        ? "100%"
        : "" + (this.props.studyTimeCumul * 100) / this.props.goalTime + "%";
    const style = {
      width: width,
    };
    //  console.log(width);
    //console.log(style);
    return (
      <div className="ProgressBar-container">
        <div className="ProgressBar" style={style}>
          <div className="ProgressBar-studyTime">{this.props.studyTimeCumul} hrs</div>
        </div>
        <div className="ProgressBar-goal">{this.props.goalTime} hrs</div>
      </div>
    );
  }
}

export default ProgressBar;
