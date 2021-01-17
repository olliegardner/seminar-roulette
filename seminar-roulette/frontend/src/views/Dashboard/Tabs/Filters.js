import React from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";

import SortByButton from "../../../components/SortByButton";

const useStyles = makeStyles((theme) => ({
  filters: {
    marginLeft: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  timeDropdown: {
    marginRight: theme.spacing(2),
    minWidth: "16ch",
    height: "5ch",
  },
}));

const Filters = (props) => {
  const {
    label,
    setOrdering,
    time,
    setTime,
    online,
    setOnline,
    servesFood,
    setServesFood,
    showRated,
    setShowRated,
    showDiscarded,
    setShowDiscarded,
  } = props;

  const classes = useStyles();

  return (
    <>
      <FormGroup row className={classes.filters}>
        {(label == "recommendations" || label == "upcoming") && (
          <FormControl variant="outlined">
            <InputLabel id="time-select-label">Time frame</InputLabel>
            <Select
              labelId="time-select-label"
              id="time-select"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              label="Time frame"
              className={classes.timeDropdown}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="hour">In an hour</MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="tomorrow">Tomorrow</MenuItem>
              <MenuItem value="week">This week</MenuItem>
              <MenuItem value="month">This month</MenuItem>
            </Select>
          </FormControl>
        )}

        <FormControlLabel
          control={
            <Checkbox
              checked={servesFood}
              onChange={(e) => setServesFood(e.target.checked)}
              name="food"
            />
          }
          label="Serves food"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={online}
              onChange={(e) => setOnline(e.target.checked)}
              name="online"
            />
          }
          label="Online only"
        />

        {label == "past" && (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showRated}
                  onChange={(e) => setShowRated(e.target.checked)}
                  name="rated"
                />
              }
              label="Show previously rated seminars"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showDiscarded}
                  onChange={(e) => setShowDiscarded(e.target.checked)}
                  name="discarded"
                />
              }
              label="Show discarded seminars"
            />
          </>
        )}

        <div className={classes.flexGrow} />

        <SortByButton setOrdering={setOrdering} />
      </FormGroup>
    </>
  );
};

Filters.propTypes = {
  label: PropTypes.string,
  setOrdering: PropTypes.func,
  time: PropTypes.string,
  setTime: PropTypes.func,
  online: PropTypes.bool,
  setOnline: PropTypes.func,
  servesFood: PropTypes.bool,
  setServesFood: PropTypes.func,
  showRated: PropTypes.bool,
  setShowRated: PropTypes.func,
  showDiscarded: PropTypes.bool,
  setShowDiscarded: PropTypes.func,
};

export default Filters;
