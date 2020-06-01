/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import "./Layout.css";
import AppBar from "../../components/Navigation/AppBar";

class Layout extends Component {
  render() {
    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        {this.props.isAuth && (
          <Grid item xs={12} style={{width: "100%"}}>
            <AppBar />
          </Grid>
        )}
        <Grid item xs={12} style={{width: "100%"}}>
          <Paper className="paper">{this.props.children}</Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Layout;
