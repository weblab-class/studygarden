import React, { Component } from "react";
import NavBar from "./modules/NavBar.js";
import LoginPage from "./pages/LoginPage.js";
import HomePage from "./pages/HomePage.js";
import NewPlantPage from "./pages/NewPlant.js";
import StudyPage from "./pages/StudyPage.js";
import NotFound from "./pages/NotFound.js";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginComponent from "./LoginComponent.js";
import AppComponent from "./AppComponent.js";

import "../utilities.css";
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

  render() {
    //if (location !== "/"){
    if (this.state.userId === "null") {
      return <Redirect to="/" />;
    }

    //}
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginComponent} />
            <Route path="/" component={AppComponent} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
