import React, { Component } from "react";
import "./Clouds.css";

class Clouds extends Component {
  render(){
    return(        
      <>
        <div className="Clouds-container">  
          <div className="cloud x1" />
          <div className="cloud x2" />
          <div className="cloud x3" />
          <div className="cloud x4" />
          <div className="cloud x5" />
        </div>
      </>
      )
  }
}

export default Clouds;