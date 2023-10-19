import React from "react";
import "./App.css";

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div id="footer">
        <p>
          Created by <a href="https://github.com/jake-good/Statify" target="_blank" rel="noreferrer noopener">
            Jake Good <i className="fa fa-github" />
            </a>
        </p>
      </div>
    );
  }
}

export default Footer;
