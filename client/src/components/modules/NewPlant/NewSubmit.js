import React, { Component } from "react";
import { post } from "../../../utilities";
import { Redirect } from "react-router-dom";

/**
 * Component creates a new plant from scratch. input boxes will come from ../modules/NewPlantInput.js
 *
 * Proptypes
 * @param {String} fields.plantName
 * @param {Number} fields.plantType
 * @param {String} fields.subject
 * @param {Number} fields.goalTime
 * @param {String} userid
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
      errStateLongEntries: false,
      errLargeGoal: false,
      errBadGoal: false,
      errHugeGoal: false,
      submitWait: false,
      // Goal: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  postNewPlant = (body) => {
    post("/api/plant/new", body).then((plant) => {
      //console.log("plant added?");
      //console.log(plant);
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
      timeCreated: this.state.timeCreated,
      goalTime: this.props.fields.goalTime * 60 ** 2,
    };
    if (
      plant.plantName.length <= 2 ||
      plant.subject.length <= 2 ||
      plant.plantName.length > 32 ||
      plant.subject.length > 32
    ) {
      if (this.state.errStateLongEntries === false) {
        this.setState({
          errStateLongEntries: true,
          errLargeGoal: false,
          errBadGoal: false,
          errHugeGoal: false,
        });
        setTimeout(() => {
          this.setState({
            errStateLongEntries: false,
          });
        }, 6000);
      }
      throw new Error("fields must be longer than 2 characters!");
    } else if (this.props.fields.goalTime === "") {
      if (this.state.errBadGoal === false) {
        this.setState({
          errStateLongEntries: false,
          errLargeGoal: false,
          errBadGoal: true,
          errHugeGoal: false,
        });
        setTimeout(() => {
          this.setState({
            errBadGoal: false,
          });
        }, 6000);
      }
      throw new Error("Goal must be a number!");
    } else if (plant.goalTime / 60 ** 2 > 2 ** 24) {
      if (this.state.errHugeGoal === false) {
        this.setState({
          errStateLongEntries: false,
          errLargeGoal: false,
          errBadGoal: false,
          errHugeGoal: true,
        });
        setTimeout(() => {
          this.setState({
            errHugeGoal: false,
          });
        }, 6000);
      }
      throw new Error("plants don't take this long to grow >:(");
    } else if (plant.goalTime / 60 ** 2 > 600) {
      if (this.state.errLargeGoal === false) {
        this.setState({
          errStateLongEntries: false,
          errLargeGoal: true,
          errBadGoal: false,
          errHugeGoal: false,
        });
        setTimeout(() => {
          this.setState({
            errLargeGoal: false,
          });
        }, 6000);
      }
      throw new Error("excessively long study session");
    } else {
      //console.log(plant);
      //console.log(this.state);
      this.postNewPlant(plant);
      this.setState({ submitWait: true, errStateLongEntries: false });
      setTimeout(() => this.setState({ isSubmitted: true }), 500);
    }
  };
  render() {
    if (this.state.isSubmitted) {
      //console.log(this.state.isSubmitted);
      return <Redirect to={`/home/${this.props.userId}`} />;
    }
    return (
      <>
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

        {this.state.errStateLongEntries && (
          <div className="NewPlant-err">
            {" "}
            Name and subject fields must be 3-32 characters long.{" "}
          </div>
        )}
        {this.state.submitWait && (
          <div className="NewPlant-submitted NewPlant-err"> Submitting plant... </div>
        )}
        {this.state.errBadGoal && <div className="NewPlant-err"> Goal must be a number. </div>}
        {this.state.errLargeGoal && (
          <div className="NewPlant-err">
            {" "}
            Your goal is very large. We suggest splitting into different plants.{" "}
          </div>
        )}
        {this.state.errHugeGoal && (
          <div className="NewPlant-err">
            {" "}
            These plants have to finish growing sometime in your lifetime...{" "}
          </div>
        )}
      </>
    );
  }
}

export default NewSubmit;
