import React, { useState } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import SeminarWheel from "../components/SeminarWheel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    minHeight: "90vh",
  },
  randomSeminarButton: {
    marginTop: theme.spacing(2),
  },
}));

const Landing = () => {
  const classes = useStyles();

  const [spin, setSpin] = useState(false);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        align="center"
        justify="center"
        className={classes.grid}
      >
        <Grid item xs={12}>
          <SeminarWheel spin={spin} />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setSpin(true)}
            className={classes.randomSeminarButton}
          >
            Random Seminar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
