import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EncryptForm = (props) => (
  <form className="encrypt-form" onSubmit={props.onEncrypt}>
    <label>Text</label>
    <textarea id="text-input" type="text" name="text" rows="6" />

    <label>Key</label>
    <input id="key-input" type="text" name="key" />
    <span id="false-key-msg" className="input-message"></span>
    <div className="button-container">
      <input id="file-input" type="file" name="file" className="upload-button" />
      <label htmlFor="file-input">
        <FontAwesomeIcon icon="file-upload" /> &nbsp; Upload
      </label>
      <button className="encrypt-button" type="submit">
        <FontAwesomeIcon icon="lock" /> &nbsp; Encrypt
      </button>
    </div>
  </form>
);

export default EncryptForm;