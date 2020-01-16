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
/*   // called whenever the user types in the new post input box
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }; */

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
    this.postNewPlant(plant);
    // this.props.onSubmit && this.props.onSubmit(this.state.value);
    // this.setState({
    //   value: "",
    // });
  };
  render(){
    return(
        <div className = "u-link">
          <button
            type="submit"
            className="NewPostInput-button u-pointer"
            value="Submit"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
    )
  }
}

export default NewSubmit;