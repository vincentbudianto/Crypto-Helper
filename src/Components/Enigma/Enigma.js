import React, { Component } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Enigma.css";

let enigma = require("../../backend/enigma");

const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    borderRadius: "10px",
    color: "#000000"
  })
};

const selectWheel = [
  { value: "UKW", label: "UKW" },
  { value: "UKW-K", label: "UKW-K" },
  { value: "Reflector A", label: "Reflector A" },
  { value: "Reflector B", label: "Reflector B" },
  { value: "Reflector C", label: "Reflector C" },
  { value: "Reflector B Thin", label: "Reflector B Thin" },
  { value: "Reflector C Thin", label: "Reflector C Thin" }
];

const truncate = (input) => {
  return (input.length > 10) ? input.substr(0, 9) + '...' : input;
}

let fileReader;

class Enigma extends Component {
  state = {
    method: enigma,
    selectedFile: undefined,
    fileName: "",
    text: "",
    key: "",
    rotorType: "",
    wheel: "Reflector B",
    wiring: ""
  }

  // On file select (from the pop up)
  onFileChange = event => {
    if (event.target.files[0] != undefined) {
      this.setState({ selectedFile: event.target.files[0] });
      this.setState({ fileName: event.target.files[0].name })
    }
  }

  onTextChange = event => {
    this.setState({ text: event.target.value })
  }

  onKeyChange = event => {
    this.setState({ key: event.target.value })
  }

  onRotorChange = event => {
    this.setState({ rotorType: event.target.value })
  }

  onWheelChange = event => {
    this.setState({ wheel: event.value })
  }

  onWiringChange = event => {
    this.setState({ wiring: event.target.value })
  }

  handleFileRead = (e) => {
    const content = fileReader.result;

    document.getElementById('plaintextResult').innerHTML = content;
    document.getElementById('ciphertextResult').innerHTML = this.state.method.cipher(content, this.state.key, this.state.rotorType, this.state.wheel, this.state.wiring);
    document.getElementById("modal-result").style.display = "block";
  }

  handleCipher = async (e) => {
    e.preventDefault();

    if (this.state.method !== undefined && this.state.key !== "") {
      console.log(this.state.method)

      if (this.state.text !== "") {
        console.log(this.state.text)
        console.log(this.state.key)
        console.log(this.state.rotorType)
        console.log(this.state.wheel)
        console.log(this.state.wiring)
        document.getElementById('plaintextResult').innerHTML = this.state.text
        document.getElementById('ciphertextResult').innerHTML = this.state.method.cipher(this.state.text, this.state.key, this.state.rotorType, this.state.wheel, this.state.wiring);
        document.getElementById("modal-result").style.display = "block";
      }
      else if (this.state.selectedFile !== undefined) {
        console.log(this.state.selectedFile);
        fileReader = new FileReader();
        fileReader.onloadend = this.handleFileRead;
    		fileReader.readAsText(this.state.selectedFile);
      }
    }
  }

  download = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById("enigmaResult").value], {
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
          placeholder="select reflector"
          styles={selectStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: "10px",
            colors: {
              ...theme.colors,
              primary50: "#95e8e6",
              primary25: "#b0f1f7",
              primary: "#b0f7f0",
            }
          })}
          options={selectWheel}
          onChange={this.onWheelChange}
          defaultValue={{ value: "Reflector B", label: "Reflector B" }}
        />
        <div className="wrapper-enigma">
          <div className="container-enigma">
            <form className="enigma-form" onSubmit={this.handleCipher}>
              <label>Text</label>
              <textarea id="text-input" placeholder="your text (example: Hello World)" type="text" name="text" rows="6" onChange={this.onTextChange} value={this.state.text}/>

              <label>Key</label>
              <input id="key-input" placeholder="rotors initial position (example: A A A)" type="text" name="key" onChange={this.onKeyChange} value={this.state.key} />

              <label>Rotors</label>
              <input id="rotor-input" placeholder="rotors type from left to right divided by spaces (example: I II III IV V VI VII VIII)" type="text" name="rotor" onChange={this.onRotorChange} value={this.state.rotorType} />

              <label>Plugboard</label>
              <input id="plug-input" placeholder="swap additional letters (example: AB GZ CD KT)" type="text" name="plugboard" onChange={this.onWiringChange} value={this.state.wiring} />

              <div className="button-container">
                <input id="file-input" type="file" name="file" className="upload-button" onChange={this.onFileChange} />
                <label htmlFor="file-input">
                  <FontAwesomeIcon icon={this.state.fileName === "" ? "file-upload" : "file"} /> &nbsp; {this.state.fileName === "" ? "Upload" : truncate(this.state.fileName)}
                </label>
                <button className="enigma-button" type="submit">
                  <FontAwesomeIcon icon="unlock" /> &nbsp; Cipher
                </button>
              </div>
            </form>
          </div>
        </div>
        <div id="modal-result" className="modal-enigma">
          <div className="modal-content-container">
            <div className="modal-content">
              <p id="message">Enigma Cipher Result</p>

              <label className="messageResult">Plaintext</label>
              <textarea id="plaintextResult" className="enigmaResult" type="text" readOnly rows="6"></textarea>

              <label className="messageResult">Ciphertext</label>
              <textarea id="ciphertextResult" className="enigmaResult" type="text" readOnly rows="6"></textarea>

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

export default Enigma;
