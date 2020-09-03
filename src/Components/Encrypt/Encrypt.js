import React, { Component } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EncryptForm from './EncryptForm';
import "./Encrypt.css";

const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    borderRadius: "10px",
    color: "#000000",
  }),
};

const selectOptions = [
  { value: "Vigenere Standard", label: "Vigenere Standard" },
  { value: "Full Vigenere Cipher", label: "Full Vigenere Cipher" },
  { value: "Auto-Key Vigenere Cipher", label: "Auto-Key Vigenere Cipher" },
  { value: "Extended Vigenere Cipher", label: "Extended Vigenere Cipher" },
  { value: "Playfair Cipher", label: "Playfair Cipher" },
  { value: "Super Encription", label: "Super Encription" },
  { value: "Affine Cipher", label: "Affine Cipher" },
  { value: "Hill Cipher", label: "Hill Cipher" },
  { value: "Enigma Cipher", label: "Enigma Cipher" }
];

class Encrypt extends Component {
  state = {
    method: undefined,
    selectedFile: undefined,
    text: undefined,
    key: undefined,
  }

  handleEncrypt = async (e) => {
    e.preventDefault();
    console.log("encrypt");
    console.log(e.target.elements.file.value);
  }

  download = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById("encryptedResult").value], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "result.txt";
    document.body.appendChild(element);
    element.click();
  }

  closeModal() {
    document.getElementById("modal-result").style.display = "none";
  }

  render() {
    return (
      <React.Fragment>
        <Select
          className="droplist"
          placeholder="Select encryption method"
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
        />
        <div className="wrapper-encrypt">
          <div className="container-encrypt">
            <EncryptForm onEncrypt={this.handleEncrypt} />
          </div>
        </div>
        <div id="modal-result" className="modal-encrypt">
          <div className="modal-content-container">
            <div className="modal-content">
              <p id="message">Result</p>
              <textarea id="encryptedResult" type="text" readOnly rows="6"></textarea>
              <div className="button-container">
                <button className="download-button">
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
