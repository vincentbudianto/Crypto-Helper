import React, { Component } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Decrypt.css";

let affine = require("../../backend/affine");
let aKVig = require("../../backend/autoKeyVigenere");
let eVig = require("../../backend/extendedVigenere");
let fVig = require("../../backend/fullVigenere");
let playfair = require("../../backend/playfair");
let sEnc = require("../../backend/superEncryption");
let Vig = require("../../backend/vigenere");

const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    borderRadius: "10px",
    color: "#000000",
  }),
};

const selectOptions = [
  { value: Vig, label: "Vigenere Standard" },
  { value: fVig, label: "Full Vigenere Cipher" },
  { value: aKVig, label: "Auto-Key Vigenere Cipher" },
  { value: eVig, label: "Extended Vigenere Cipher" },
  { value: playfair, label: "Playfair Cipher" },
  { value: sEnc, label: "Super Encription" },
  { value: affine, label: "Affine Cipher" },
  { value: "Hill Cipher", label: "Hill Cipher" },
  { value: "Enigma Cipher", label: "Enigma Cipher" }
];

const truncate = (input) => {
  return (input.length > 10) ? input.substr(0, 9) + '...' : input;
}

let fileReader;

class Decrypt extends Component {
  state = {
    method: undefined,
    selectedFile: undefined,
    fileName: "",
    text: "",
    key: "",
  }

  onTextChange = event => {
    this.setState({ text: event.target.value })
  }

  onKeyChange = event => {
    this.setState({ key: event.target.value })
  }

  onMethodChange = event => {
    // Update the state
    console.log(event)
    this.setState({ method: event.value })
  }

  // On file select (from the pop up)
  onFileChange = event => {
    // Update the state
    if (event.target.files[0] != undefined) {
      this.setState({ selectedFile: event.target.files[0] });
      this.setState({ fileName: event.target.files[0].name })
    }
  };

  handleFileRead = (e) => {
    const content = fileReader.result;
    console.log(content);
  }

  handleDecrypt = async (e) => {
    e.preventDefault();

    if (this.state.method !== undefined && this.state.key !== "") {
      console.log(this.state.method)
      if (this.state.text !== "") {
        console.log(this.state.text)
        console.log(this.state.key)
        document.getElementById('decryptedResult').innerHTML = this.state.method.decrypt(this.state.text, this.state.key);
        document.getElementById("modal-result").style.display = "block";
        // alert(this.state.method.decrypt(this.state.text, this.state.key)) // Decryption result
        /**
         * TODO : Connect to modal
         */
      }
      else if (this.state.selectedFile !== undefined) {
        console.log(this.state.selectedFile);
        fileReader = new FileReader();
        fileReader.onloadend = this.handleFileRead;
        fileReader.readAsArrayBuffer(this.state.selectedFile);
      }
    }
  }

  download = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById("decryptedResult").value], {
      type: "text/plain;charset=utf-8",
    });

    element.className = "download-file";
    element.href = URL.createObjectURL(file);
    element.download = "result.txt";
    document.body.appendChild(element);
    element.click();
    element.remove();
  }

  closeModal() {
    document.getElementById("modal-result").style.display = "none";
  }

  render() {
    return (
      <React.Fragment>
        <Select
          className="droplist"
          placeholder="Select decryption method"
          styles={selectStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: "10px",
            colors: {
              ...theme.colors,
              primary50: "#95e8e6",
              primary25: "#b0f1f7",
              primary: "#b0f7f0",
            },
          })}
          options={selectOptions}
          onChange={this.onMethodChange}
        />
        <div className="wrapper-decrypt">
          <div className="container-decrypt">
            <form className="decrypt-form" onSubmit={this.handleDecrypt}>
              <label htmlFor="text" id="label-account">Text</label>
              <textarea id="text-input" type="text" name="text" rows="6" onChange={this.onTextChange} value={this.state.text}/>

              <label htmlFor="key" id="label-key">Key</label>
              <input id="key-input" type="text" name="key" onChange={this.onKeyChange} value={this.state.key}/>
              <span id="false-key-msg" className="input-message"></span>

              <div className="button-container">
                <input id="file-input" type="file" name="file" className="upload-button" onChange={this.onFileChange} />
                <label htmlFor="file-input">
                  <FontAwesomeIcon icon={this.state.fileName === "" ? "file-upload" : "file"} /> &nbsp; {this.state.fileName === "" ? "Upload" : truncate(this.state.fileName)}
                </label>
                <button className="decrypt-button" type="submit">
                  <FontAwesomeIcon icon="lock-open"/> &nbsp; Decrypt
                </button>
              </div>
            </form>
          </div>
        </div>
        <div id="modal-result" className="modal-decrypt">
          <div className="modal-content-container">
            <div className="modal-content">
              <p id="message">Result</p>
              <textarea id="decryptedResult" type="text" readOnly rows="6"></textarea>
              <div className="button-container">
                <button className="download-button" onClick={this.download}>
                  <FontAwesomeIcon icon="cloud-download-alt" /> &nbsp; Download
                </button>
                <button className="close-button" onClick={this.closeModal}>
                  <FontAwesomeIcon icon="times-circle" /> &nbsp; Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Decrypt;
