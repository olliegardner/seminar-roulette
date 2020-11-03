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
    primary: {
      main: colors.indigo[600],
    },
    secondary: {
      main: "#5850EC",
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
    background: {
      default: colors.common.white,
      dark: "#f4f6f8",
      paper: colors.common.white,
    },
  },
  direction: "ltr",
  overrides: {
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: colors.common.white,
        },
      },
    },
  },
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
