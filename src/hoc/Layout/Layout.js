/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import "./Layout.css";
import IndicatorsInsert from "../../containers/IndicatorsInsert/IndicatorsInsert";
import OutlayDetails from "../../containers/OutlayDetails/OutlayDetails";

class Layout extends Component {
  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        {/* <div className="row">
          <IndicatorsInsert />
        </div> */}
        <div className="row">
          <OutlayDetails />
        </div>
      </div>
    );
  }
}

export default Layout;
