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

const muiTheme = createMuiTheme({
  palette: {
    text: {
      primary: colors.common.white,
      secondary: colors.common.white,
    },
    background: {
      default: "#0b032d",
      paper: "#0b032d",
    },
  },
  direction: "ltr",
  props: {
    MuiPaper: {
      elevation: 0,
    },
    MuiButton: {
      disableElevation: true,
    },
  },
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
