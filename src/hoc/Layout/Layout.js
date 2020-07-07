/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { connect } from "react-redux";

import "./Layout.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AppBar from "../../components/Navigation/AppBar";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./Theme";

class Layout extends Component {
  render() {
    const languageIndex =
      localStorage.getItem("languageIndex") === undefined
        ? 0
        : +localStorage.getItem("languageIndex");

    if (languageIndex === 0) {
      document.title = "Система коммунальных показателей";
    }
    if (languageIndex === 1) {
      document.title = "The system of municipal indicators";
    }

    return (
      <ThemeProvider theme={theme}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          {this.props.isAuth && (
            <Grid item xs={12} style={{ width: "100%" }}>
              <AppBar userDetails={this.props.userDetails} />
            </Grid>
          )}
          <Grid item xs={12} style={{ width: "100%" }}>
            <Paper className="paper">{this.props.children}</Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
  };
};

export default connect(mapStateToProps)(Layout);
