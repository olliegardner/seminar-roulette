import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import RouteWithLayout from "./components/RouteWithLayout";
import Layout from "./layout/Layout";
import Landing from "./views/Landing";
import History from "./views/History";
import Lucky from "./views/Lucky";
import Recommendations from "./views/Recommendations";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/logout"
          render={() =>
            (window.location = "http://127.0.0.1:8000/admin/logout")
          }
        />
        <RouteWithLayout component={Landing} layout={Layout} exact path="/" />
        <RouteWithLayout
          component={Lucky}
          layout={Layout}
          exact
          path="/lucky"
        />
        <RouteWithLayout
          component={History}
          layout={Layout}
          exact
          path="/history"
        />
        <RouteWithLayout
          component={Recommendations}
          layout={Layout}
          exact
          path="/recommendations"
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
