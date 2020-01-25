import React, { Component } from "react";

import NavBar from "./modules/NavBar.js";
import LoginPage from "./pages/LoginPage.js";
import HomePage from "./pages/HomePage.js";
import NewPlantPage from "./pages/NewPlant.js";
import StudyPage from "./pages/StudyPage.js";
import NotFound from "./pages/NotFound.js";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "../utilities.css";
//import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */

class AppComponent extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      isLoggedOut: null,
      name: null,
    };
  }

  componentDidMount() {
    //make this async eventually
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ 
          userId: user._id, 
          name: user.name,
        });
        console.log("user detected");
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      //  post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    console.log("Logged out successfully!");
    this.setState({ userId: null, isLoggedOut: true });
    post("/api/logout").then((user) => {
      this.setState({ userId: null });
    });
  };

  render() {
    if (this.state.isLoggedOut) {
      console.log("is logged out!");
      return <Redirect to="/" />;
    }
    return (
      <>
        <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
          name={this.state.name}
        />

        <Switch>
          <Route exact path="/home/:userId" component={HomePage} />
          <Route component={NewPlantPage} path="/home/:userId/newplant" />
          <Route component={StudyPage} path="/home/:userId/study/:plantId" />
          <Route component={NotFound} default />
        </Switch>
      </>
    );
  }
}

export default AppComponent;
