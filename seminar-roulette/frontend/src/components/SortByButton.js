import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, makeStyles, MenuItem, Popover } from "@material-ui/core";
import SortOutlinedIcon from "@material-ui/icons/SortOutlined";

const useStyles = makeStyles((theme) => ({
  sort: {
    marginRight: theme.spacing(1.5),
    height: "5ch",
  },
}));

const SortByButton = (props) => {
  const { setOrdering } = props;

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
      <Button
        variant="contained"
        startIcon={<SortOutlinedIcon />}
        disableElevation
        onClick={handleOpen}
        className={classes.sort}
        color="default"
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
          Seminar title A to Z
        </MenuItem>
        <MenuItem color="inherit" onClick={() => handleSort("-title")}>
          Seminar title Z to A
        </MenuItem>
        <MenuItem color="inherit" onClick={() => handleSort("start_time")}>
          Date ascending
        </MenuItem>
        <MenuItem color="inherit" onClick={() => handleSort("-start_time")}>
          Date descending
        </MenuItem>
      </Popover>
    </>
  );
};

SortByButton.propTypes = {
  setOrdering: PropTypes.func,
};

export default SortByButton;
