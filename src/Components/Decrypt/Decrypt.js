import React, { Component } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Decrypt.css";

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
    color: "#000000"
  })
}

const selectOptions = [
  { value: affine, label: "Affine Cipher" },
  { value: aKeyVigenere, label: "Auto-Key Vigenere Cipher" },
  { value: eVigenere, label: "Extended Vigenere Cipher" },
  { value: fVigenere, label: "Full Vigenere Cipher" },
  { value: hill, label: "Hill Cipher" },
  { value: playfair, label: "Playfair Cipher" },
  { value: sEncryption, label: "Super Encryption" },
  { value: vigenere, label: "Vigenere Cipher" }
]

const truncate = (input) => {
  return (input.length > 10) ? input.substr(0, 9) + '...' : input;
}

let fileReader;

class Decrypt extends Component {
  state = {
    method: undefined,
    methodName: "",
    selectedFile: undefined,
    fileType: "",
    fileName: "",
    text: "",
    key: ""
  }

  onTextChange = event => {
    this.setState({ text: event.target.value });
  }

  onKeyChange = event => {
    this.setState({ key: event.target.value });
  }

  onMethodChange = event => {
    this.setState({ method: event.value });
    this.setState({ methodName: event.label });
    this.setState({ key: "" });

    if (event.value == vigenere || event.value == fVigenere || event.value == aKeyVigenere || event.value == eVigenere || event.value == playfair || event.value == sEncryption) {
      document.getElementById("key-input").placeholder = "random text (example: secret key)";
    } else if (event.value == affine) {
      document.getElementById("key-input").placeholder = "relatively prime number of 26 and shift magnitude (example: 7 10)";
    } else if (event.value == hill) {
      document.getElementById("key-input").placeholder = "3x3 matrix (example: 17 17 5 21 18 21 2 2 19)";
    }
  }

  // On file select (from the pop up)
  onFileChange = event => {
    if (event.target.files[0] != undefined) {
      this.setState({ selectedFile: event.target.files[0] });
      this.setState({ fileName: event.target.files[0].name });
      this.setState({ fileType: event.target.files[0].type });
    }
  }

  handleFileRead = (e) => {
    const content = fileReader.result;

    if (this.state.fileType === "text/plain") {
      let decrypted = this.state.method.decrypt(content, this.state.key);

      document.getElementById('methodResult').innerHTML = this.state.methodName;
      document.getElementById('ciphertextResult').innerHTML = content;
      document.getElementById('decryptedResult').innerHTML = decrypted;
      document.getElementById("modal-result").style.display = "block";
    } else {
      const typedArray = new Uint8Array(content);
      const array = [...typedArray];

      let decrypted = this.state.method.decrypt(array, this.state.key);

      const decryptedBuffer = new Uint8Array(decrypted);

      this.downloadExtended(decryptedBuffer);
    }
  }

  downloadExtended = (content) => {
    const element = document.createElement("a");
    const file = new Blob([content], {
      type: this.state.fileType,
    });

    element.className = "download-file";
    element.href = URL.createObjectURL(file);
    element.download = "Decrypted-" + this.state.fileName;
    document.body.appendChild(element);
    element.click();
    element.remove();
  }

  handleDecrypt = async (e) => {
    e.preventDefault();

    if (this.state.method !== undefined && this.state.key !== "") {
      if (this.state.text !== "") {
        document.getElementById('methodResult').innerHTML = this.state.methodName;
        document.getElementById('ciphertextResult').innerHTML = this.state.text;
        document.getElementById('decryptedResult').innerHTML = this.state.method.decrypt(this.state.text, this.state.key);
        document.getElementById("modal-result").style.display = "block";
      } else if (this.state.selectedFile !== undefined) {
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
    const file = new Blob([document.getElementById("decryptedResult").value], {
      type: "text/plain;charset=utf-8"
    });

    element.className = "download-file";
    element.href = URL.createObjectURL(file);
    element.download = "Decrypted-" + this.state.fileName;
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
          placeholder="select decryption method"
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
        <div className="wrapper-decrypt">
          <div className="container-decrypt">
            <form className="decrypt-form" onSubmit={this.handleDecrypt}>
              <label htmlFor="text" id="label-account">Text</label>
              <textarea id="text-input" placeholder="your ciphertext (example: CZOLNE)" type="text" name="text" rows="6" onChange={this.onTextChange} value={this.state.text}/>

              <label htmlFor="key" id="label-key">Key</label>
              <input id="key-input" placeholder="please select decryption method" type="text" name="key" onChange={this.onKeyChange} value={this.state.key}/>

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
              <p id="message"><span id="methodResult"></span> Result</p>

              <label className="messageResult">Ciphertext</label>
              <textarea id="ciphertextResult" className="decryptedResult" type="text" readOnly rows="6"></textarea>

              <label className="messageResult">Plaintext</label>
              <textarea id="decryptedResult" className="decryptedResult" type="text" readOnly rows="6"></textarea>
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
