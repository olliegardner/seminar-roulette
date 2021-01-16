import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Popover,
  Select,
} from "@material-ui/core";
import SortOutlinedIcon from "@material-ui/icons/SortOutlined";

const useStyles = makeStyles((theme) => ({
  filters: {
    marginLeft: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
  },
  flexGrow: {
    flexGrow: 1,
  },
  sort: {
    marginRight: theme.spacing(1.5),
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

  const [anchorEl, setAnchorEl] = useState(null);

  const isOpen = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  const handleOpen = (e) => setAnchorEl(e.currentTarget);

  const handleSort = (field) => {
    setOrdering(field);
    handleClose();
  };

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

      <Button
        variant="contained"
        startIcon={<SortOutlinedIcon />}
        disableElevation
        onClick={handleOpen}
        className={classes.sort}
      >
        Sort by
      </Button>

      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        elevation={1}
      >
        <MenuItem color="inherit" onClick={() => handleSort("title")}>
          Seminar title A-Z
        </MenuItem>
        <MenuItem color="inherit" onClick={() => handleSort("-title")}>
          Seminar title Z-A
        </MenuItem>
        <MenuItem color="inherit" onClick={() => handleSort("start_time")}>
          Date closest to now
        </MenuItem>
        <MenuItem color="inherit" onClick={() => handleSort("-start_time")}>
          Date farthest from now
        </MenuItem>
      </Popover>
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
