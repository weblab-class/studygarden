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
      errState: false,
      submitWait: false,
      // Goal: "",
    };
    this.handleSubmit=this.handleSubmit.bind(this);
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
  handleSubmit =  (event) => {
    event.preventDefault();
    const plant = {
      plantName: this.props.fields.plantName,
      plantType: this.props.fields.plantType,
      subject: this.props.fields.subject,
      id: this.props.userId,
      timeCreated: this.state.timeCreated,
      goalTime: this.props.fields.goalTime*(60**2),
    };
    if (plant.plantName.length <= 2 || plant.subject.length <= 2 || plant.plantName.length > 16 || plant.subject.length > 16)  {
      if(this.state.errState === false){
        this.setState({ errState: true });
        setTimeout(()=>{
          this.setState({
            errState: false,
          })
        },6000);
      }
      throw new Error("fields must be longer than 2 characters!");
      
    } else {
      console.log(plant);
      this.postNewPlant(plant);
      this.setState({submitWait: true, errState: false,})
      setTimeout(() => this.setState({ isSubmitted: true }),500)
      
    }
  };
  render() {
    if (this.state.isSubmitted) {
      console.log(this.state.isSubmitted);
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
      
        {this.state.errState &&
        <div className= "NewPlant-err"> Name and subject fields must be 3-16 characters long! </div>}
        {this.state.submitWait &&
        <div className= "NewPlant-submitted NewPlant-err"> Submitting plant... </div>}
      </>
    );
  }
}

export default NewSubmit;
