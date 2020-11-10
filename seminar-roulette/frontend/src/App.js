import React, { useEffect, useState } from "react";
import axios from "axios";
import { MuiThemeProvider, createMuiTheme, colors } from "@material-ui/core";
import dotenv from "dotenv";

import UserContext from "./context/UserContext";
import Router from "./Router";

dotenv.config();

axios.defaults.baseURL =
  process.env.PRODUCTION == "true"
    ? "https://howard.dcs.gla.ac.uk/"
    : "http://127.0.0.1:8000/";

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: colors.teal[600],
    },
    secondary: {
      main: colors.teal[400],
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
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`api/current-user.json`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (user) {
      setUserLoaded(true);
    }
  }, [user]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <UserContext.Provider value={user}>
        {userLoaded && <Router />}
      </UserContext.Provider>
    </MuiThemeProvider>
  );
};

export default App;
