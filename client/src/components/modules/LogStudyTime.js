//modal
import React, { Component } from "react";
import { post } from "../../utilities";
import StudyTimeSubmit from "./StudyTimeSubmit.js";

/**
 * Component creates a new plant from scratch. input boxes will come from ../modules/NewPlantInput.js
 *
 * Proptypes
 *
 * @param {Number} fields.plantType
 * @param {Number} fields.goalTime
 * @param {String} creator_id
 */
import "../../utilities.css";

class LogStudyTime extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      studySessionLength: 1,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  postNewPlant = (body) => {
    post("/api/plant/new", body).then((plant) => {
      console.log("plant added?");
      console.log(plant);
    });
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (target.type === "number") {
      //prevents putting a negative number in
      if (target.value < 1) {
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

  //could use .map() here...
  render() {
    if (!this.props.showModal) {
      return null;
    }
    return (
      <form className="LogStudyTime-form">
        <label className="LogStudyTime-container">
          How long did you study (in hours)?
          <input
            name="studySessionLength"
            type="number"
            value={this.state.studySessionLength}
            onChange={this.handleChange}
            className="LogStudyTime-input"
          />
        </label>

        <StudyTimeSubmit
          fields={{
            studySessionLength: this.state.studySessionLength,
            plantType: this.props.plantType,
          }}
          userId={this.props.userId}
        />
      </form>
    );
  }
}
export default LogStudyTime;
