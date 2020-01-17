import React, { Component } from "react";
import { post } from "../../utilities";
import NewSubmit from "./NewPlant/NewSubmit.js";

/**
 * Component creates a new plant from scratch. input boxes will come from ../modules/NewPlantInput.js
 *
 * Proptypes
 *
 * @param {Number} fields.plantType
 * @param {Number} fields.goalTime
 * @param {String} creator_id
 */
import "./NewPlantInput.css";
import "../../utilities.css";
//import "./HomePage.css";

class NewPlantInput extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      plantName: "",
      subject: "",
      goalTime: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // remember -- api calls go here!
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  //could use .map() here...
  render() {
    return (
      <form className="NewPlantInput-form">
        <label className="NewPlantInput-container">
          Subject:
          <input
            name="subject"
            type="text"
            value={this.state.subject}
            onChange={this.handleChange}
            className="NewPlantInput-input"
          />
        </label>
        <label className="NewPlantInput-container">
          Goal (in hours):
          <input
            name="goalTime"
            type="number"
            value={this.state.goalTime}
            onChange={this.handleChange}
            className="NewPlantInput-input"
          />
        </label>
        <label className="NewPlantInput-container">
          Name Your Plant:
          <input
            name="plantName"
            type="text"
            value={this.state.plantName}
            onChange={this.handleChange}
            className="NewPlantInput-input"
          />
        </label>

        <NewSubmit
          fields={{
            plantName: this.state.plantName,
            plantType: this.props.plantType,
            subject: this.state.subject,
            goalTime: this.state.goalTime,
          }}
          userId={this.props.userId}
        />
      </form>
    );
  }
}
export default NewPlantInput;