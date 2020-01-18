import React, { Component } from "react";
import { Link } from "@reach/router";
import "./SinglePlant.css";

import plant11 from "../../../img/flowers/Asset 1.1.png";
import plant12 from "../../../img/flowers/Asset 1.2.png";
import plant13 from "../../../img/flowers/Asset 1.3.png";
import plant14 from "../../../img/flowers/Asset 1.4.png";

import plant21 from "../../../img/flowers/Asset 2.1.png";
import plant22 from "../../../img/flowers/Asset 2.2.png";
import plant23 from "../../../img/flowers/Asset 2.3.png";
import plant24 from "../../../img/flowers/Asset 2.4.png";

import plant31 from "../../../img/flowers/Asset 3.1.png";
import plant32 from "../../../img/flowers/Asset 3.2.png";
import plant33 from "../../../img/flowers/Asset 3.3.png";
import plant34 from "../../../img/flowers/Asset 3.4.png";

import plant41 from "../../../img/flowers/Asset 4.1.png";
import plant42 from "../../../img/flowers/Asset 4.2.png";
import plant43 from "../../../img/flowers/Asset 4.3.png";
import plant44 from "../../../img/flowers/Asset 4.4.png";

import plant51 from "../../../img/flowers/Asset 5.1.png";
import plant52 from "../../../img/flowers/Asset 5.2.png";
import plant53 from "../../../img/flowers/Asset 5.3.png";
import plant54 from "../../../img/flowers/Asset 5.4.png";

/**
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} plantName
 * @param {string} creator_id
 * @param {number} plantType
 * @param {number} stage
 */

const plantStages = [
  [plant11, plant12, plant13, plant14], //empty flowerpots
  [plant21, plant22, plant23, plant24],
  [plant31, plant32, plant33, plant34],
  [plant41, plant42, plant43, plant44],
  [plant51, plant52, plant53, plant54], //completed stage of plants
];

class SinglePlant extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="SinglePlant-plantContainer">
        <img
          className="SinglePlant-plant"
          //src={plantStages[this.props.stage][this.props.plantType]}
          src={plantStages[2][2]}
        />
      </div>
    );
  }
}

export default SinglePlant;
