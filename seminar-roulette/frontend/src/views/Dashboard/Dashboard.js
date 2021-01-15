import React, { useContext } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Tabs from "./Tabs/Tabs";

import UserInterests from "../../components/UserInterests";
import UserContext from "../../context/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Landing = () => {
  const classes = useStyles();
  const user = useContext(UserContext);

  const notAuthenticated = user.guid == "None";

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Seminars at the University of Glasgow
      </Typography>

      {!notAuthenticated && <UserInterests />}

      <Tabs />
    </div>
  );
};

export default Landing;
