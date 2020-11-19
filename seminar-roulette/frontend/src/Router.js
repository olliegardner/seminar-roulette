import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import RouteWithLayout from "./components/RouteWithLayout";
import Layout from "./layout/Layout";
import Dashboard from "./views/Dashboard/Dashboard";
import History from "./views/History";
import Recommendations from "./views/Recommendations";
import Seminar from "./views/Seminar";
import FourZeroFour from "./views/FourZeroFour";
import SeminarNotFound from "./views/SeminarNotFound";

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
        <RouteWithLayout component={Dashboard} layout={Layout} exact path="/" />
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
        <RouteWithLayout
          component={SeminarNotFound}
          layout={Layout}
          exact
          path="/seminar/not-found"
        />
        <RouteWithLayout
          component={Seminar}
          layout={Layout}
          exact
          path="/seminar/:seminarId"
        />
        <Route component={FourZeroFour} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
