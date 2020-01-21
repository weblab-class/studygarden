import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import { navigate } from "@reach/router";
import initialBench from "../../../img/initialBench.png";
import SinglePlant from "../modules/SinglePlant.js";

import "../../utilities.css";
import "./HomePage.css";

class HomePage extends Component {
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

    get(`/api/user`, { userId: this.props.userId }).then((user) => this.setState({ user: user }));

    get("/api/plant", { creatorId: this.props.userId }).then((plantObjs) => {
      let reversedStoryObjs = plantObjs.reverse();
      reversedStoryObjs.map((plantObj) => {
        this.setState({ plants: this.state.plants.concat([plantObj]) });
      });
    });
  }

  render() {
    let plantsList = null;
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
          userId={this.props.userId}
        />
      ));
      /* plantsList = (
        <>
          <SinglePlant
            key={`Plant_41`}
            _id={1}
            plantName={"name"}
            creator_id={"5e1e1865a5e5f1d360758694"}
            plantType={2}
            stage={1}
            userId={this.props.userId}
          />
          <SinglePlant
            key={`Plant_42`}
            _id={2}
            plantName={"name"}
            creator_id={"5e1e1865a5e5f1d360758694"}
            plantType={2}
            stage={2}
            userId={this.props.userId}
          />
          <SinglePlant
            key={`Plant_43`}
            _id={3}
            plantName={"name"}
            creator_id={"5e1e1865a5e5f1d360758694"}
            plantType={1}
            stage={3}
            userId={this.props.userId}
          />
          <SinglePlant
            key={`Plant_44`}
            _id={4}
            plantName={"name"}
            creator_id={"5e1e1865a5e5f1d360758694"}
            plantType={0}
            stage={1}
            userId={this.props.userId}
          />
          <SinglePlant
            key={`Plant_44`}
            _id={4}
            plantName={"name"}
            creator_id={"5e1e1865a5e5f1d360758694"}
            plantType={3}
            stage={1}
            userId={this.props.userId}
          />
        </>
      ); //this is for testing purposes */
      console.log(plantsList);
    } else {
      plantsList = <div>No plants yet...</div>;
    }
    return (
      <>
        <div className="HomePage-container">
          {this.state.user ? (
            <>
              <div className="HomePage-text">
                <h1>Welcome, {this.state.user.name}!</h1>
                <h2>see your garden here.</h2>{" "}
              </div>

              <div className="HomePage-windowsill">
                <img src={initialBench} className="HomePage-bench" />
                <div className="HomePage-plantsContainer">{plantsList}</div>
              </div>
            </>
          ) : (
            <div> Loading... </div>
          )}
        </div>
      </>
    );
  }
}

export default HomePage;
