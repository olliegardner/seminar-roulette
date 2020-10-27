import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
  colors,
} from "@material-ui/core";
import UserContext from "./context/UserContext";
import Router from "./Router";

// const colours = ["#ef5777", "#575fcf", "#4bcffa", "#34e7e4", "#0be881"];
const colours1 = ["#264653"];
const colours2 = ["#003049"];
const colours3 = ["#073B4C"];
const colours4 = ["#0b032d"];
const randomColour = colours4[Math.floor(Math.random() * colours4.length)];

const muiTheme = createMuiTheme({
  palette: {
    text: {
      primary: colors.common.white,
      secondary: colors.common.white,
    },
    background: {
      default: randomColour,
      paper: randomColour,
    },
  },
  direction: "ltr",
});

const App = () => {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios;
    axios
      .get(`api/current-user.json`)
      .then((res) => {
        setUser(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <UserContext.Provider value={user}>
        <CssBaseline />
        {loaded && <Router />}
      </UserContext.Provider>
    </MuiThemeProvider>
  );
};

export default App;
