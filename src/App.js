import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import OutlayDetails from "./containers/OutlayDetails/OutlayDetails";
import IndicatorsInsert from "./containers/IndicatorsInsert/IndicatorsInsert";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path="/outlay" component={OutlayDetails} />
          <Route exact path="/send-indicators" component={IndicatorsInsert} />
          <Redirect exact from="/" to="/outlay" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
