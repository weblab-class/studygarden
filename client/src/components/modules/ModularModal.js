//modal
import React, { Component } from "react";
import { post } from "../../utilities";

/**
 * Component creates a new studySession from scratch.
 *
 * Proptypes
 *
 * @param {String} prompt
 * @param {String} choiceOne.choice
 * @param {String} choiceTwo.choice
 * @param {function} choiceOne.action
 * @param {function} choiceTwo.action
 * @param {boolean} showModal
 * etc.
 * @param {function} onClose
 */
import "../../utilities.css";
import "../pages/StudyPage.css";
import "./ModularModal.css"

class ModularModal extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  handleChange(event) {

  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };
  // called when the user hits "Submit" for a new post

  render() {
    if (!this.props.showModal) {
      return null;
    }
    return (
      <div className= "ModularModal-background">
        <div className = "ModularModal-container">
          <div className="ModularModal-promptContainer">
          <div className="ModularModal-prompt">{this.props.prompt}</div>
          </div>
          <div className="ModularModal-buttonContainer">
            <button className="ModularModal-button" onClick = {this.props.choiceOne.action}>
              {this.props.choiceOne.choice}
            </button>
            <button className="ModularModal-button"  onClick = {this.props.choiceTwo.action}>
              {this.props.choiceOne.choice}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ModularModal;
