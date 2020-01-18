import React, { Component } from "react";
import { post } from "../../../utilities";

/**
 * Component creates a new plant from scratch. input boxes will come from ../modules/NewPlantInput.js
 *
 * Proptypes
 * @param {String} fields.plantName
 * @param {Number} fields.plantType
 * @param {String} fields.subject
 * @param {Number} fields.goalTime
 * @param {String} creator_id
 */

//should combine into newplantinput
import "../../pages/NewPlant.css";
import "../../../utilities.css";
//import "./HomePage.css";

class NewSubmit extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      timeCreated: Date.now(),
      // Goal: "",
    };
  }

  postNewPlant = (body) => {
    post("/api/plant/new", body).then((plant) => {
      console.log("plant added?");
      console.log(plant);
    });
  };

  componentDidMount() {
    // remember -- api calls go here!
  }

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    const plant = {
      plantName: this.props.fields.plantName,
      plantType: this.props.fields.plantType,
      subject: this.props.fields.subject,
      id: this.props.userId,
      time: this.state.timeCreated,
      goalTime: this.props.fields.goalTime,
    };
    if (plant.plantName.length <= 2 || plant.subject.length <= 2) {
      //this feels dumb help me
      throw new Error("fields must be longer than 2 characters!");
    } else {
      console.log(plant);
      this.postNewPlant(plant);
    }
  };
  render() {
    return (
      <div className="NewPlantInput-buttonContainer">
        <button
          type="submit"
          className="NewPlantInput-submitButton u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          plant!
        </button>
      </div>
    );
  }
}

export default NewSubmit;
