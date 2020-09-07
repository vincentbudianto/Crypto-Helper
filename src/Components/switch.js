import React from "react";
import { func, string } from "prop-types";
import "./switch.css";

const Switch = ({ theme, toggleTheme }) => {
  const isLight = theme === "light";

  return (
    <div className="wrapper">
      <input readOnly onClick={toggleTheme} type="checkbox" id="hide-checkbox" checked={isLight ? true : false}></input>
      <label htmlFor="hide-checkbox" className="toggle">
        <span className="toggle-button">
          <span className="crater crater-1"></span>
          <span className="crater crater-2"></span>
          <span className="crater crater-3"></span>
          <span className="crater crater-4"></span>
          <span className="crater crater-5"></span>
          <span className="crater crater-6"></span>
          <span className="crater crater-7"></span>
        </span>
        <span className="star star-1"></span>
        <span className="star star-2"></span>
        <span className="star star-3"></span>
        <span className="star star-4"></span>
        <span className="star star-5"></span>
        <span className="star star-6"></span>
        <span className="star star-7"></span>
        <span className="star star-8"></span>
      </label>
    </div>
  );
};

Switch.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default Switch;
