import React from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  makeStyles,
} from "@material-ui/core";

import SortByButton from "../../../components/SortByButton";

const useStyles = makeStyles((theme) => ({
  filters: {
    marginLeft: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
  },
  flexGrow: {
    flexGrow: 1,
  },
}));

const Filters = (props) => {
  const {
    label,
    setOrdering,
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
        {/* <FormControl variant="outlined">
          <InputLabel id="time-select-label">Time</InputLabel>
          <Select
            labelId="time-select-label"
            id="time-select"
            value={time}
            onChange={(e) => setTime()}
            label="Time"
          >
            <MenuItem value="hour">In an hour</MenuItem>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="tomorrow">Tomorrow</MenuItem>
            <MenuItem value="week">This week</MenuItem>
            <MenuItem value="month">This month</MenuItem>
          </Select>
        </FormControl> */}

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
      </FormGroup>

      <div className={classes.flexGrow} />

      <SortByButton setOrdering={setOrdering} />
    </>
  );
};

Filters.propTypes = {
  label: PropTypes.string,
  setOrdering: PropTypes.func,
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
