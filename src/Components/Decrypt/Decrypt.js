import React, { Component } from "react";
import logo from "../../logo.svg";
import DecryptForm from './DecryptForm';
import "./Decrypt.css";

class Decrypt extends Component {
  handleDecrypt = async e => {
    e.preventDefault();
    console.log("decrypt");
  }

  render() {
    return (
      <React.Fragment>
        <div className="wrapper-decrypt">
          <div className="container-decrypt">
            <DecryptForm onDecrypt={this.handleDecrypt} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Decrypt;
