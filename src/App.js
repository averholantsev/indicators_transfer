import React from "react";
import { Route, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import OutlayDetails from "./containers/OutlayDetails/OutlayDetails";
import IndicatorsInsert from "./containers/IndicatorsInsert/IndicatorsInsert";

function App() {
  return (
    <div className="App">
      <Layout>
        <Route path="/outlay" component={OutlayDetails} />
        <Route path="/send-indicators" component={IndicatorsInsert} />
        <Redirect from='/' to='/outlay' />
      </Layout>
    </div>
  );
}

export default App;
