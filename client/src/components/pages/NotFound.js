import React, { Component } from "react";


import "../../utilities.css"
import "./NotFound.css"
class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="NotFound-container">
        <div className="u-loading NotFound">
          <h1>404 Not Found</h1>
          <p>The page you requested couldn't be found.</p>
        </div>
      </div>
    );
  }
}

export default NotFound;
