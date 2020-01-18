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

    get("/api/plant", { creator_id: this.props.userId }).then((plantObjs) => {
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
          creator_id={plantObj.creator_id}
          plantType={plantObj.plantType}
          stage={plantObj.stage}
          userId={this.props.userId}
        />
      ));
    } else {
      plantsList = <div>No plants!</div>;
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
