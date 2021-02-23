import React, { useContext } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import Tabs from "./Tabs";

import UserInterests from "../../components/UserInterests";
import UserContext from "../../context/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  text: {
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },
}));

const Landing = () => {
  const classes = useStyles();
  const user = useContext(UserContext);

  const notAuthenticated = user.guid == "None";

  return (
    <div className={classes.root}>
      <Typography variant="h5" color="textPrimary" className={classes.text}>
        Discover seminars hosted at the University of Glasgow
      </Typography>

      {!notAuthenticated && (
        <>
          <Typography color="textSecondary" className={classes.text}>
            Enter up to 5 of your personal interests below
          </Typography>

          <Box my={3}>
            <UserInterests />
          </Box>
        </>
      )}

      <Tabs />
    </div>
  );
};

export default Landing;
