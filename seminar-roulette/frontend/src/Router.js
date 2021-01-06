import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import RouteWithLayout from "./components/RouteWithLayout";
import Layout from "./layout/Layout";
import Dashboard from "./views/Dashboard/Dashboard";
import Seminar from "./views/Seminar";
import FourZeroFour from "./views/FourZeroFour";
import SeminarNotFound from "./views/SeminarNotFound";
import Search from "./views/Search";

const Router = () => {
  const onProduction = process.env.PRODUCTION == "true";

  return (
    <BrowserRouter>
      <Switch>
        {!onProduction && (
          <Route
            exact
            path="/login"
            render={() => (window.location = "/admin/login/")}
          />
        )}

        {onProduction ? (
          <Route
            exact
            path="/logout"
            render={() => (window.location = "/Shibboleth.sso/Logout")}
          />
        ) : (
          <Route
            exact
            path="/logout"
            render={() => (window.location = "/admin/logout")}
          />
        )}

        <RouteWithLayout component={Dashboard} layout={Layout} exact path="/" />
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
        <RouteWithLayout
          component={Search}
          layout={Layout}
          exact
          path="/search/:search"
        />

        <Route component={FourZeroFour} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
