import React, { Component } from "react";
import logo from "../../logo.svg";
import "./Title.css";

class Title extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="wrapper-title">
          <div>
            <img src={logo} className="App-logo-spin" alt="logo" width="30%" />
          </div>

          <div className="text-title1">Crypto Helper</div>

          <div className="text-title2">Encryption and Decryption Tools</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Title;
