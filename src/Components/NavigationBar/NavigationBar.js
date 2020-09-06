import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

class NavigationBar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar-wrapper">
          <Link to="/title">
            <div className="navbar-button">
              <font color="white">Home</font>
            </div>
          </Link>

          <Link to="/encrypt">
            <div className="navbar-button">
              <font color="white">Encryption</font>
            </div>
          </Link>

          <Link to="/decrypt">
            <div className="navbar-button">
              <font color="white">Decryption</font>
            </div>
          </Link>

          <Link to="/enigma">
            <div className="navbar-button">
              <font color="white">Enigma Machine</font>
            </div>
          </Link>

          <Link to="/docs">
            <div className="navbar-button">
              <font color="white">Documentation</font>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default NavigationBar;
