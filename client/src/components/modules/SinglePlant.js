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
            //  src={PLANT_STAGES[2][0]}
          />
          <div className="bottom">
            <h3>{this.props.plantName}</h3>
            <Link to={`/home/${this.props.userId}/study/${this.props._id}`}>
              <button className="studyButton"> study! </button>
            </Link>
            <i />
          </div>
        </div>
      </div>
    );
  }
}

export default SinglePlant;
