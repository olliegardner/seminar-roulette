import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import RouteWithLayout from "./components/RouteWithLayout";
import Layout from "./layout/Layout";
import Dashboard from "./views/Dashboard/Dashboard";
import FourZeroFour from "./views/FourZeroFour";
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
