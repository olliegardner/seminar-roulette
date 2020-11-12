import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
}));

const LoadingSpinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
