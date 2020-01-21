import React, { Component } from "react";
import { post } from "../../utilities";

import plant1 from "../../../img/flowers/Asset 5.1.png";
import plant2 from "../../../img/flowers/Asset 5.2.png";
import plant3 from "../../../img/flowers/Asset 5.3.png";
import plant4 from "../../../img/flowers/Asset 5.4.png";

/**
 * Component creates a new plant from scratch. input boxes will come from ../modules/NewPlantInput.js
 *
 * Proptypes
 * @param {String} fields.plantName
 * @param {Number} fields.plantType
 * @param {String} fields.subject
 * @param {Number} fields.goalTime
 * @param {String} creator_id
 * @param {Function} setPlantType(newplanttype)
 */

//should combine into newplantinput
import "../pages/NewPlant.css";
import "../../utilities.css";

const images = [plant1, plant2, plant3, plant4];

class PlantSlider extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      images: [plant1, plant2, plant3, plant4],
      currentIndex: 0,
    };
  }

  goToPrevSlide = () => {
    if (this.state.currentIndex === 0) {
      this.setState({
        currentIndex: this.state.images.length,
      });
    }

    // This will not run if we met the if condition above
    this.setState((prevState) => ({
      currentIndex: prevState.currentIndex - 1,
    }));
  };

  goToNextSlide = /* async */ () => {
    if (this.state.currentIndex === this.state.images.length - 1) {
      /* await */ this.setState({
        currentIndex: 0,
      });
      //console.log("changed index to " + String(this.state.currentIndex))
    } else {
      // This will not run if we met the if condition above
      this.setState((prevState) => ({
        currentIndex: prevState.currentIndex + 1,
      }));
    }
  };

  componentDidMount() {
    // remember -- api calls go here!
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentIndex !== prevState.currentIndex) {
      this.props.setPlantType(this.state.currentIndex);
    }
  }

  render() {
    return (
      <div className="NewPlant-plantSliderContainer">
        <div className="PlantSlider-backArrow" onClick={this.goToPrevSlide} />
        <div className="NewPlant-plantSelection">
          <img className="NewPlant-singlePlant" src={images[this.state.currentIndex]} />
        </div>

        <div className="PlantSlider-nextArrow" onClick={this.goToNextSlide} />
      </div>
    );
  }
}

export default PlantSlider;
