import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4">Dashboard</Typography>
    </div>
  );
};

export default Landing;
