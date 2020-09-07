import React, { Component } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Encrypt.css";
import { string } from "mathjs";

let str = require("../../backend/util/string")
let vigenere = require("../../backend/vigenere");
let fVigenere = require("../../backend/fullVigenere");
let aKeyVigenere = require("../../backend/autoKeyVigenere");
let eVigenere = require("../../backend/extendedVigenere");
let playfair = require("../../backend/playfair");
let sEncryption = require("../../backend/superEncryption");
let affine = require("../../backend/affine");
let hill = require("../../backend/hill");

const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    borderRadius: "10px",
    color: "#000000",
  })
}

const selectOptions = [
  { value: vigenere, label: "Vigenere Standard" },
  { value: fVigenere, label: "Full Vigenere Cipher" },
  { value: aKeyVigenere, label: "Auto-Key Vigenere Cipher" },
  { value: eVigenere, label: "Extended Vigenere Cipher" },
  { value: playfair, label: "Playfair Cipher" },
  { value: sEncryption, label: "Super Encription" },
  { value: affine, label: "Affine Cipher" },
  { value: hill, label: "Hill Cipher" }
]

const truncate = (input) => {
  return (input.length > 10) ? input.substr(0, 9) + '...' : input;
}

let fileReader;

class Encrypt extends Component {
  state = {
    method: undefined,
    selectedFile: undefined,
    fileType: "",
    fileName: "",
    text: "",
    key: ""
  }

  onTextChange = event => {
    this.setState({ text: event.target.value })
  }

  onKeyChange = event => {
    this.setState({ key: event.target.value })
  }

  onMethodChange = event => {
    this.setState({ method: event.value })

    if (event.value == vigenere || event.value == fVigenere || event.value == aKeyVigenere || event.value == eVigenere || event.value == playfair || event.value == sEncryption) {
      document.getElementById("key-input").placeholder = "example: secret key";
    } else if (event.value == affine) {
      document.getElementById("key-input").placeholder = "example: 7 10";
    } else if (event.value == hill) {
      document.getElementById("key-input").placeholder = "example: 17 17 5 21 18 21 2 2 19";
    }
  }

  // On file select (from the pop up)
  onFileChange = event => {
    if (event.target.files[0] != undefined) {
      this.setState({ selectedFile: event.target.files[0] });
      this.setState({ fileName: event.target.files[0].name });
      this.setState({ fileType: event.target.files[0].type });
      console.log(this.state);
    }
  }

  handleFileRead = (e) => {
    const content = fileReader.result;
    
    if (this.state.fileType === "text/plain") {
      let encrypted = this.state.method.encrypt(content, this.state.key);
      encrypted = str.formatOutput(encrypted, 5);
      document.getElementById('encryptedResult').innerHTML = encrypted;
      document.getElementById("modal-result").style.display = "block";
    } else {
      console.log(content);
      const typedArray = new Uint8Array(content);
      const array = [...typedArray];
      var encrypted = this.state.method.encrypt(array, this.state.key);
      const encryptedBuffer = new Uint8Array(encrypted);
      console.log(encryptedBuffer);
      this.downloadExtended(encryptedBuffer);
    }
  }

  downloadExtended = (content) => {
    const element = document.createElement("a");
    const file = new Blob([content], {
      type: this.state.fileType,
    });

    element.className = "download-file";
    element.href = URL.createObjectURL(file);
    element.download = "Encrypted-" + this.state.fileName;
    document.body.appendChild(element);
    element.click();
    element.remove();
  }

  handleEncrypt = async (e) => {
    e.preventDefault();

    if (this.state.method !== undefined && this.state.key !== "") {
      console.log(this.state.method)

      if (this.state.text !== "") {
        console.log(this.state.text)
        console.log(this.state.key)
      let encrypted = this.state.method.encrypt(this.state.text, this.state.key);
      encrypted = str.formatOutput(encrypted, 5);
      document.getElementById('encryptedResult').innerHTML = encrypted;
      document.getElementById("modal-result").style.display = "block";
      }
      else if (this.state.selectedFile !== undefined) {
        console.log(this.state.selectedFile);
        fileReader = new FileReader();
        fileReader.onloadend = this.handleFileRead;

        if (this.state.method == eVigenere) {
          fileReader.readAsArrayBuffer(this.state.selectedFile);
        } else {
          fileReader.readAsText(this.state.selectedFile);
        }
      }
    }
  }

  download = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById("encryptedResult").value], {
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
          className="method-droplist"
          placeholder="Select encryption method"
          styles={selectStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: "10px",
            colors: {
              ...theme.colors,
              primary50: "#95e8e6",
              primary25: "#b0f1f7",
              primary: "#b0f7f0"
            }
          })}
          options={selectOptions}
          onChange={this.onMethodChange}
        />
        <div className="wrapper-encrypt">
          <div className="container-encrypt">
            <form className="encrypt-form" onSubmit={this.handleEncrypt}>
              <label>Text</label>
              <textarea id="text-input" placeholder="example: Hello World" type="text" name="text" rows="6" onChange={this.onTextChange} value={this.state.text}/>

              <label>Key</label>
              <input id="key-input" placeholder="please select encryption method" type="text" name="key" onChange={this.onKeyChange} value={this.state.key}/>

              <div className="button-container">
                <input id="file-input" type="file" name="file" className="upload-button" onChange={this.onFileChange} />
                <label htmlFor="file-input">
                  <FontAwesomeIcon icon={this.state.fileName === "" ? "file-upload" : "file"} /> &nbsp; {this.state.fileName === "" ? "Upload" : truncate(this.state.fileName)}
                </label>
                <button className="encrypt-button" type="submit">
                  <FontAwesomeIcon icon="lock" /> &nbsp; Encrypt
                </button>
              </div>
            </form>
          </div>
        </div>
        <div id="modal-result" className="modal-encrypt">
          <div className="modal-content-container">
            <div className="modal-content">
              <p id="message">Result</p>
              <textarea id="encryptedResult" type="text" readOnly rows="6"></textarea>
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

export default Encrypt;
