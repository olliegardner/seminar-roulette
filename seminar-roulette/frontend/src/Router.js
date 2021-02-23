import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import RouteWithLayout from "./components/RouteWithLayout";
import Layout from "./layout/Layout";
import Landing from "./views/Landing/Landing";
import FourZeroFour from "./views/FourZeroFour";
import Search from "./views/Search";
import UserContext from "./context/UserContext";

const Router = (props) => {
  const { themeType, setThemeType } = props;
  const user = useContext(UserContext);

  const notAuthenticated = user.guid == "None";
  const onProduction = process.env.PRODUCTION == "true";

  return (
    <BrowserRouter>
      <Switch>
        {onProduction ? (
          <Route
            exact
            path="/login"
            render={() =>
              (window.location = notAuthenticated ? "/login/" : "/")
            }
          />
        ) : (
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

        <RouteWithLayout
          component={Landing}
          layout={Layout}
          themeType={themeType}
          setThemeType={setThemeType}
          exact
          path="/"
        />

        <RouteWithLayout
          component={Search}
          layout={Layout}
          themeType={themeType}
          setThemeType={setThemeType}
          exact
          path="/search/:search"
        />

        <Route component={FourZeroFour} />
      </Switch>
    </BrowserRouter>
  );
};

Router.propTypes = {
  themeType: PropTypes.string,
  setThemeType: PropTypes.func,
};

export default Router;
