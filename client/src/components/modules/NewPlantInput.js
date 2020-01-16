import React, { Component } from "react";
import { post } from "../../utilities";
import NewSubmit from "NewPlant/NewSubmit";

/**
 * Component creates a new plant from scratch. input boxes will come from ../modules/NewPlantInput.js
 *
 * Proptypes
 * 
 * @param {Number} fields.plantType
 * @param {Number} fields.goalTime
 * @param {String} creator_id
 */



 
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
  }

  

  componentDidMount() {
    // remember -- api calls go here!
  }

  changeField = (field, input) => {
    this.setState({[field]: input,});
  }
//could use .map() here...
  render(){
      return(
        <div className="u-flex"> 
          <InputBox
            type="text"
            defaultText="subject"
            field = "subject"
            changeField = {this.changeField}
            className="NewPostInput-input"
          />
          
          <InputBox
            type="text"
            defaultText="Goal"
            field = "goalTime"
            changeField = {this.changeField}
            className="NewPostInput-input"
          />

          <InputBox
            type="text"
            defaultText="name"
            field = "plantName"
            changeField = {this.changeField}
            className="NewPostInput-input"
          />
          <NewSubmit fields={{
            plantName: this.state.plantName,
            plantType: this.props.plantType,
            subject: this.state.subject,
            goalTime: this.state.goalTime,
            
          }} 
          userId={this.props.userId} />
        </div>)}
}

class InputBox extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      value: ""
    };
  }
// called whenever the user types in the new post input box
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
    if (this.props.field !== "Goal"){
      this.changeField(this.props.field,this.state.value);
    }else{
      this.changeField(this.props.field,this.state.value.parseInt()); 
    }
  };

  
  render(){
    return(
      <div className="u-flex">
        <input
          type="text"
          placeholder={this.props.defaultText}
          value={this.state.value}
          onChange={this.handleChange}
          className="NewPostInput-input"
        />
      </div>
    )
  }
}


export default NewPlantInput;