import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import initialBench from "../../../img/initialBench.png";
import SinglePlant from "../modules/SinglePlant.js";
import Shelf from "../modules/Shelf.js";
import { Redirect, Link } from "react-router-dom";

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

    get(`/api/user`, { userId: this.props.match.params.userId }).then((user) =>
      this.setState({ user: user })
    );

    get("/api/plant", { creatorId: this.props.match.params.userId }).then((plantObjs) => {
      let reversedStoryObjs = plantObjs.reverse().slice(0, 5);
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
      console.log("is logged out!");
      return <Redirect to="/" />;
    }
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
          userId={this.props.match.params.userId}
        />
      ));
    } else {
      plantsList = <div style={{display: "flex", width: "100%", justifyContent: "center"}}> <div className = "Homepage-empty">No plants found! Click "new plant" to fix that.</div></div>;
    }
    return (
      <>
        <div className="HomePage-container">
          {this.state.user ? (
            <>
              <div className="HomePage-text">
                <h1 className="Homepage-name">Welcome, {this.state.user.name}!</h1>
                <h2 className="Homepage-seeYourGarden">Here is your garden.</h2>{" "}
              </div>

              <div className="HomePage-windowsill">
                <Shelf img={initialBench} bench={"initialBench"} plantsList={plantsList} />
              </div>
              <Link
                className="HomePage-archiveLink"
                to={`/home/${this.props.match.params.userId}/archive`}
              >
                See the rest of your plants!
              </Link>
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
