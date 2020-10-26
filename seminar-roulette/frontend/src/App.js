import React, { useEffect, useState } from "react";
import axios from "axios";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import UserContext from "./context/UserContext";
import Router from "./Router";

const muiTheme = createMuiTheme({});

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
        {loaded && <Router />}
      </UserContext.Provider>
    </MuiThemeProvider>
  );
};

export default App;
