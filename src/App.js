import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import Layout from "./hoc/Layout/Layout";
import AuthForm from "./containers/AuthForm/AuthForm";
import Logout from "./containers/AuthForm/Logout/Logout";
import RegistrationForm from "./containers/RegistrationForm/RegistrationForm";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";
import IndicatorsInsert from "./containers/IndicatorsInsert/IndicatorsInsert";
import OutlayDetails from "./containers/OutlayDetails/OutlayDetails";
import Tariffs from "./containers/Tariffs/Tariffs";
import UsersProfile from "./containers/UsersProfile/UsersProfile";

class App extends Component {
  UNSAFE_componentWillMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={AuthForm} />
        <Route path="/registration" component={RegistrationForm} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Redirect to="/auth" />
      </Switch>
    );

    if (localStorage.getItem("userId")) {
      routes = (
        <Switch>
          <Route path="/outlay" component={OutlayDetails} />
          <Route path="/send-indicators" component={IndicatorsInsert} />
          <Route path="/tariffs" component={Tariffs} />
          <Route path="/profile" component={UsersProfile} />
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
