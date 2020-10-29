import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Landing from "./views/Landing";
import Lucky from "./views/Lucky";
import History from "./views/History";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route exact path="/lucky">
          <Lucky />
        </Route>

        <Route exact path="/history">
          <History />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
