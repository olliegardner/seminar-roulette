import React, { useContext, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import UserContext from "../context/UserContext";
import SeminarWheel from "../components/SeminarWheel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    minHeight: "100vh",
    maxWidth: "100%",
  },
}));

const Landing = () => {
  const classes = useStyles();
  const user = useContext(UserContext);

  const [spin, setSpin] = useState(false);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.grid}
      >
        <Grid item xs={12} align="center">
          <Typography variant="h2">Seminar Roulette</Typography>
          <Typography>Current user: {user.guid}</Typography>
          <br />
          <SeminarWheel spin={spin} />
          <br />
          <Button variant="contained" onClick={() => setSpin(true)}>
            Random Seminar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
