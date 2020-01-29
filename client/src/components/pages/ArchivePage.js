import React, { Component } from "react";
import { get } from "../../utilities";
import genericBench from "../../../img/generic bench.png";
import SinglePlant from "../modules/SinglePlant.js";
import Shelf from "../modules/Shelf.js";
import { Redirect } from "react-router-dom";

import "../../utilities.css";
import "./ArchivePage.css";

class ArchivePage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      user: null,
      plants: [],
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
    document.title = "Profile Page";

    get(`/api/user`, { userId: this.props.match.params.userId }).then((user) =>
      this.setState({ user: user })
    );

    get("/api/plant", { creatorId: this.props.match.params.userId }).then((plantObjs) => {
      let reversedStoryObjs = plantObjs.reverse();
      reversedStoryObjs.map((plantObj) => {
        this.setState({ plants: this.state.plants.concat([plantObj]) });
      });
    });
    get("/api/whoami").then((user) => {
      if (!user._id) {
        this.setState({ isLoggedOut: true });
      }
    });
    //console.log(this.props.userId)
    //this.props.checkUser(this.props.userId);
  }

  render() {
    if (this.state.isLoggedOut) {
      //console.log("is logged out!");
      return <Redirect to="/" />;
    }
    let plantsList = null;
    let plantChunks = [];
    let shelves = null;
    const hasPlants = this.state.plants.length !== 0;
    if (hasPlants) {
      plantsList = this.state.plants.map((plantObj) => (
        <SinglePlant
          key={`Plant_${plantObj._id}`}
          _id={plantObj._id}
          plantName={plantObj.plantName}
          subject={plantObj.subject}
          creator_id={plantObj.creator_id}
          plantType={plantObj.plantType}
          stage={plantObj.stage}
          userId={this.props.match.params.userId}
        />
      ));
      //this is for testing purposes
      //console.log(plantsList);
      while (plantsList.length) {
        plantChunks.push(plantsList.splice(0, 5));
      }

      shelves = plantChunks.map((chunk, i) => (
        <Shelf img={genericBench} bench={"genericBench"} plantsList={chunk} key={i} />
      ));
    } else {
      return (
        <div className="ArchivePage-container">
          <div className="ArchivePage-text">
            You have no plants right now! Click 'new plant' in the navigation bar to create a new
            one, then come back here to see all your plants.
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="ArchivePage-container">
          {this.state.user ? (
            <>
              <h3 className="ArchivePage-text">See all the plants you've grown here!</h3>
              <div className="ArchivePage-shelfContainer">{shelves}</div>
            </>
          ) : (
            <div> Loading... </div>
          )}
        </div>
      </>
    );
  }
}

export default ArchivePage;
