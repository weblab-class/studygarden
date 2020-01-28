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
import "../pages/NewPlant.css";
import "../../utilities.css";
//import "./HomePage.css";

class NewPlantInput extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      plantName: "",
      subject: "",
      goalTime: 1,
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
    if (target.type === "number") {
      //prevents putting a negative number in
      if (target.value === "") {
        this.setState({
          [name]: value,
        });
      } else if (target.value < 1) {
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
    return (
      <form className="NewPlantInput-form">
        <label className="NewPlantInput-container">
          <div className="NewPlantInput-title">subject</div>
          <input
            name="subject"
            type="text"
            value={this.state.subject}
            onChange={this.handleChange}
            className="NewPlantInput-input"
            placeholder="What subject would you like to study?"
          />
        </label>
        <label className="NewPlantInput-container">
          <div className="NewPlantInput-title">goal (in hours)</div>
          <input
            name="goalTime"
            type="number"
            value={this.state.goalTime}
            onChange={this.handleChange}
            className="NewPlantInput-input"
          />
        </label>
        <label className="NewPlantInput-container">
          <div className="NewPlantInput-title">plant name</div>
          <input
            name="plantName"
            type="text"
            value={this.state.plantName}
            onChange={this.handleChange}
            className="NewPlantInput-input"
            placeholder="Give your cute new plant a name!"
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
        {/* <button className="NewPlantInput-cancel">cancel</button> */}
      </form>
    );
  }
}
export default NewPlantInput;
