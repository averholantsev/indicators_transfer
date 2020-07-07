import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import { LanguageProvider } from "./components/Languages/Language";
import Layout from "./hoc/Layout/Layout";
import Authorization from "./containers/Authorization/Authorization";
import Logout from "./containers/Authorization/Logout/Logout";
import Registration from "./containers/Registration/Registration";
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
        <Route path="/auth" component={Authorization} />
        <Route path="/registration" component={Registration} />
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
    return (
      <LanguageProvider>
        <Layout isAuth={this.props.isAuth}>{routes}</Layout>
      </LanguageProvider>
    );
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
