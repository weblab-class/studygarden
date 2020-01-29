//modal
import React, { Component } from "react";
import { post } from "../../utilities";
import getNiceTime from "./GetNiceTime.js"

/**
 * Component creates a new studySession from scratch.
 *
 * Proptypes
 *
 * @param {Number} fields.elapsedTime
 * @param {String} creator_id
 */
import "../../utilities.css";
import "../pages/StudyPage.css";

class EnterSessionLength extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      sessionLength: 1,
      errStateBadNumber: false,
      errStateHugeNumber: false,
      errStateBeyondGoal: false,
      maxStudyTime: (Math.ceil((this.props.plant.goalTime-this.props.plant.studyTimeCumul)/60))
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(value)
    if (target.type === "number") {
      //prevents putting a negative number in
      if (target.value === "") {
        this.setState({
          [name]: value,
        });
      } else if (Number(value) < 1 || value === "") {
        this.setState({
          [name]: 1,
        });
      } else {
        this.setState({
          [name]: value,
        });
      }
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };
  // called when the user hits "Submit" for a new post
  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.sessionLength === ""){
      this.setState({ errStateBadNumber: true, errStateHugeNumber: false,  errStateBeyondGoal: false});
      setTimeout(()=>{
        this.setState({
          errStateBadNumber: false,
        })
      },6000);
      throw new Error("enter a number!")
    }else if(this.state.sessionLength*60>2**24){
      this.setState({ errStateHugeNumber: true, errStateBadNumber: false, errStateBeyondGoal: false });
      setTimeout(()=>{
        this.setState({
          errStateHugeNumber: false,
        })
      },6000);
      throw new Error("surely you dont want to study that long")
    }else if (this.state.sessionLength>this.state.maxStudyTime){
      this.setState({ errStateHugeNumber: false, errStateBadNumber: false, errStateBeyondGoal: true });
      setTimeout(()=>{
        this.setState({
          errStateBeyondGoal: false,
        })
      },6000);
      throw new Error("study time beyond goal")
    }else{
      this.props.startStudy((this.state.sessionLength)*60);
    }
  };

  render() {
    if (!this.props.showModal) {
      return null;
    }
    return (
      <div className= "StudyPage-formContainer">
        <form className="LogStudyTime-form">
          <button
            onClick={(e) => {
              this.onClose(e);
            }}
            className="LogStudyTime-closeButton u-pointer"
          >
            close
          </button>
          <label className="LogStudyTime-container">
            <div className="LogStudyTime-text">How many minutes do you want to study?</div>
            <div>
            <input
              name="sessionLength"
              type="number"
              value={this.state.sessionLength}
              onChange={this.handleChange}
              className="LogStudyTime-input"
            />
            </div>
          </label>

          <button
            type="submit"
            className="LogStudyTime-submitButton u-pointer"
            value="Submit"
            onClick={this.handleSubmit}
          >
            submit!
          </button>
          {this.state.errStateBadNumber &&
        <div className= "LogStudyTime-err"> Enter a number! </div>}
        {this.state.errStateHugeNumber &&
        <div className= "LogStudyTime-err"> Surely you don't want to study that long... </div>}
        {this.state.errStateBeyondGoal &&
        <div className= "LogStudyTime-err"> Cannot study past goal! (In {getNiceTime(this.state.maxStudyTime*60) + ")"} </div>}
        </form>
        
      </div>
    )
  }
}
export default EnterSessionLength;
