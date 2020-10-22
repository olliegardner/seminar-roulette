import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Router from "./Router";

const muiTheme = createMuiTheme({});

const App = () => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <Router />
    </MuiThemeProvider>
  );
};

export default App;
