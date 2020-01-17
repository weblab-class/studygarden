import React, { Component } from "react";
import { Router } from "@reach/router";
import NavBar from "./modules/NavBar.js";
import LoginPage from "./pages/LoginPage.js";
import HomePage from "./pages/HomePage.js";
import NewPlantPage from "./pages/NewPlant.js";
import StudyPage from "./pages/StudyPage.js";
import NotFound from "./pages/NotFound.js";

import "../utilities.css";
import "./App.css";
//import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
    };
  }

  componentDidMount() {
    //make this async eventually
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
        console.log("user detected");
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      location.href = `/home/${
        this.state.userId
      }`; /*todo: change to not use window
      //  because jenn says it's bad lmao*/
      //  sort of resolved, location.href acts like a link
      //  post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    console.log("Logged out successfully!");
    this.setState({ userId: null });
    post("/api/logout");
  };

  render() {
    return (
      <>
        <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
        />
        <div className="App-container">
          <Router>
            <LoginPage
              path="/"
              userId={this.state.userId}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
            />
            <HomePage path="/home/:userId" />
            <NewPlantPage path="/home/:userId/newplant" />
            <StudyPage path="/home/:userId/study/:plantId" />
            <NotFound default />
          </Router>
        </div>
      </>
    );
  }
}

export default App;
