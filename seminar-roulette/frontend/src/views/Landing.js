import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, makeStyles } from "@material-ui/core";
import UserContext from "../context/UserContext";
import SeminarWheel from "../components/SeminarWheel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
        style={{ minHeight: "100vh", maxWidth: "100%" }}
      >
        <Grid item xs={12} align="center">
          <h1>Seminar Roulette</h1>
          <p>Current user: {user.guid}</p>

          <Button component={Link} to="/lucky">
            Random Seminar
          </Button>

          <Button onClick={() => setSpin(true)}>SPIN</Button>

          <SeminarWheel spin={spin} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
