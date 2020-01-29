//modal
import React, { Component } from "react";
import { post } from "../../utilities";

/**
 * Component creates a new studySession from scratch.
 *
 * Proptypes
 *
 * @param {Number} fields.elapsedTime
 * @param {String} creator_id
 */
import "../../utilities.css";
import "../pages/StudyPage.css";

class EnterSessionLength extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      sessionLength: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (target.type === "number") {
      //prevents putting a negative number in
      if (target.value === "") {
        this.setState({
          [name]: value,
        });
      } else if (target.value < 1) {
        this.setState({
          [name]: 1,
        });
      } else {
        this.setState({
          [name]: value,
        });
      }
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };
  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.startStudy((this.state.sessionLength)*60);
  };

  render() {
    if (!this.props.showModal) {
      return null;
    }
    return (
      <div className= "StudyPage-formContainer">
        <form className="LogStudyTime-form">
          <button
            onClick={(e) => {
              this.onClose(e);
            }}
            className="LogStudyTime-closeButton u-pointer"
          >
            close
          </button>
          <label className="LogStudyTime-container">
            <div className="LogStudyTime-text">How many minutes do you want to study?</div>
            <div>
            <input
              name="sessionLength"
              type="number"
              value={this.state.sessionLength}
              onChange={this.handleChange}
              className="LogStudyTime-input"
            />
            </div>
          </label>

          <button
            type="submit"
            className="LogStudyTime-submitButton u-pointer"
            value="Submit"
            onClick={this.handleSubmit}
          >
            submit!
          </button>
        </form>
      </div>
    )
  }
}
export default EnterSessionLength;
