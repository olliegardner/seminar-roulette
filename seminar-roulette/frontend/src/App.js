import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThemeProvider, createMuiTheme, colors } from "@material-ui/core";
import dotenv from "dotenv";

import UserContext from "./context/UserContext";
import Router from "./Router";

dotenv.config();

axios.defaults.baseURL =
  process.env.PRODUCTION == "true"
    ? "https://howard.dcs.gla.ac.uk/"
    : "http://127.0.0.1:8000/";

const themeType = "light";

const theme = createMuiTheme({
  palette: {
    type: themeType,
    primary: {
      main: colors.teal[600],
    },
    secondary: {
      main: colors.teal[400],
    },
    background: {
      default: themeType == "light" ? colors.common.white : "#212121",
      paper: themeType == "light" ? colors.common.white : "#333",
    },
  },
  direction: "ltr",
  overrides: {
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor:
            themeType == "light" ? colors.common.white : "#212121",
        },
      },
    },
  },
  props: {
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
    if (user) setUserLoaded(true);
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
        {userLoaded && <Router />}
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
