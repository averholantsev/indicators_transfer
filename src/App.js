import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import OutlayDetails from "./containers/OutlayDetails/OutlayDetails";
import IndicatorsInsert from "./containers/IndicatorsInsert/IndicatorsInsert";
import Tariffs from "./containers/Tariffs/Tariffs";
import AuthForm from "./containers/AuthForm/AuthForm";
import Logout from "./containers/AuthForm/Logout/Logout";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={AuthForm} />
        <Redirect to="/auth" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/outlay" component={OutlayDetails} />
          <Route path="/send-indicators" component={IndicatorsInsert} />
          <Route path="/tariffs" component={Tariffs} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/send-indicators" />
        </Switch>
      );
    }
    return <Layout isAuth={this.props.isAuth}>{routes}</Layout>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
