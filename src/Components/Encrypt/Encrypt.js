import React, { Component } from "react";
import logo from "../../logo.svg";
import EncryptForm from './EncryptForm';
import "./Encrypt.css";

class Encrypt extends Component {
  handleEncrypt = async e => {
    e.preventDefault();
    console.log("encrypt");
  }

  render() {
    return (
      <React.Fragment>
        <div className="wrapper-encrypt">
          <div className="container-encrypt">
            <EncryptForm onEncrypt={this.handleEncrypt} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Encrypt;
