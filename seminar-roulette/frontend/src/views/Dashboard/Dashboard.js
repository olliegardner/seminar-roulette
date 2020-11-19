import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Tabs from "./Tabs/Tabs";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Seminars at the University of Glasgow
      </Typography>
      <Tabs />
    </div>
  );
};

export default Landing;
