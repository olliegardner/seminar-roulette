import React, { useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
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
  timeDropdown: {
    minWidth: 125,
    backgroundColor: theme.palette.common.white,
    marginBottom: theme.spacing(2),
  },
}));

const Landing = () => {
  const classes = useStyles();

  const [spin, setSpin] = useState(false);
  const [time, setTime] = useState("hour");

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
          <FormControl variant="outlined">
            <InputLabel id="time-label">Find seminars</InputLabel>
            <Select
              labelId="time-label"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              label="Find seminars"
              className={classes.timeDropdown}
            >
              <MenuItem value="hour">in an hour</MenuItem>
              <MenuItem value="today">today</MenuItem>
              <MenuItem value="tomorrow">tomorrow</MenuItem>
              <MenuItem value="week">this week</MenuItem>
              <MenuItem value="month">this month</MenuItem>
            </Select>
          </FormControl>

          <SeminarWheel spin={spin} time={time} />

          <Button
            variant="contained"
            color="secondary"
            onClick={() => setSpin(true)}
            className={classes.randomSeminarButton}
          >
            I'm Feeling Lucky
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
