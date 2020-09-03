import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DecryptForm = (props) => (
  <form className="decrypt-form" onSubmit={props.onDecrypt}>
    <label htmlFor="text" id="label-account">Text</label>
    <textarea id="text-input" type="text" name="text" rows="6" />

    <label htmlFor="key" id="label-key">Key</label>
    <input id="key-input" type="text" name="key" />
    <span id="false-key-msg" className="input-message"></span>

    <div className="button-container">
      <input id="file-input" type="file" name="file" className="upload-button" />
      <label htmlFor="file-input">
        <FontAwesomeIcon icon="file-upload" /> &nbsp; Upload
      </label>
      <button className="decrypt-button" type="submit">
        <FontAwesomeIcon icon="lock-open"/> &nbsp; Decrypt
      </button>
    </div>
  </form>
);

export default DecryptForm;