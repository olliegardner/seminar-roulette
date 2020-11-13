import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
  useMediaQuery,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

import FastfoodIcon from "@material-ui/icons/Fastfood";
import FastfoodOutlinedIcon from "@material-ui/icons/FastfoodOutlined";
import SeminarWheel from "./SeminarWheel";

const useStyles = makeStyles((theme) => ({
  timeDropdown: {
    minWidth: 125,
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(3),
  },
  controls: {
    marginTop: theme.spacing(3),
  },
}));

const RandomSeminarDialog = (props) => {
  const classes = useStyles();

  const { open, onClose } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [food, setFood] = useState(false);
  const [spin, setSpin] = useState(false);
  const [time, setTime] = useState("hour");

  const handleSubmit = (e) => {
    e.preventDefault();

    setSpin(true);
    setFood(false);
    setTime("hour");

    onClose();
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="seminar-dialog-title"
        fullScreen={fullScreen}
      >
        <DialogTitle id="seminar-dialog-title">Random Seminars</DialogTitle>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Discover seminars around the university which you may not have
              thought about attending before.
            </DialogContentText>

            <div className={classes.controls}>
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

              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FastfoodOutlinedIcon />}
                    checkedIcon={<FastfoodIcon />}
                    name="food"
                    checked={food}
                    onChange={(e) => setFood(e.target.checked)}
                  />
                }
                label="Serves food"
              />
            </div>
          </DialogContent>

          <DialogActions>
            <Button color="secondary" onClick={onClose}>
              Close
            </Button>
            <Button color="secondary" variant="contained" type="submit">
              Discover
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <SeminarWheel spin={spin} setSpin={setSpin} time={time} food={food} />
    </Fragment>
  );
};

export default RandomSeminarDialog;

RandomSeminarDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
