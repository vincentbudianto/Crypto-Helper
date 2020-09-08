import React, { Component } from "react";
import "./BottomBar.css";

class BottomBar extends Component {
  render() {
    return (
      <div className="bottombar">
        <div className="bottombar-wrapper">
          <footer>
            Copyright &copy; 2020 -&nbsp;
            <a className="bottombar-a" href="https://github.com/xio84">xio84</a>
            &nbsp;&amp;&nbsp;
            <a className="bottombar-a" href="https://github.com/vincentbudianto">vincent VB</a></footer>
        </div>
      </div>
    );
  }
}

export default BottomBar;
