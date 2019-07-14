import React from "react";

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <footer id="main_footer">
        <p>
          Created by <a href="#">Jake Good</a>
        </p>
        <a>
          <i className="fa fa-github" />
        </a>
        <a>
          <i className="fa fa-person" />
        </a>
      </footer>
    );
  }
}

export default Footer;
