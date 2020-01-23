/* eslint-disable no-unused-vars */
import React, { Component } from "react";

import "./Layout.css";
import Aux from "../AuxW/AuxW";
import Navigation from "../../components/UI/Navigation/Navigation";

class Layout extends Component {
  render() {
    return (
      <Aux>
        <Navigation />
        <div className="ui middle aligned center aligned grid">
          <div className="row">{this.props.children}</div>
        </div>
      </Aux>
    );
  }
}

export default Layout;
