import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import genericBench from "../../../img/generic bench.png";
import SinglePlant from "./SinglePlant.js";
import { Redirect } from "react-router-dom";

import "../../utilities.css";
import "./Shelf.css";

class Shelf extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
  }

  render() {
    return (
      <>
        <div className={`Shelf-${this.props.bench}`}>
          <img src={this.props.img} className="Shelf-bench" />
          <div className="Shelf-plantsContainer">{this.props.plantsList}</div>
        </div>
      </>
    );
  }
}

export default Shelf;
