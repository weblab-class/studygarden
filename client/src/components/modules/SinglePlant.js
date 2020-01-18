import React, { Component } from "react";
import { Link } from "@reach/router";
import "./SinglePlant.css";
import { PLANT_STAGES } from "./PlantStages.js";

/**
 *
 * Proptypes
 * @param {string} _id of the plant
 * @param {string} plantName
 * @param {string} creator_id
 * @param {number} plantType
 * @param {number} stage
 */

class SinglePlant extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(PLANT_STAGES);
    return (
      <div className="SinglePlant-plantContainer">
        <div className="btn btn-primary tooltip">
          <img
            className="SinglePlant-plant"
            src={PLANT_STAGES[this.props.stage][this.props.plantType]}
          />
          <div className="bottom">
            <h3>{this.props.plantName}</h3>
            <button className="studyButton"> study! </button>
            <i />
          </div>
        </div>
      </div>
    );
  }
}

export default SinglePlant;
