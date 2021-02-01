import React from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const GuidedTour = (props) => {
  const { setTourOpen } = props;

  return (
    <Tooltip title="Help" placement="bottom">
      <IconButton
        aria-label="guided tour"
        color="inherit"
        onClick={(e) => setTourOpen(true)}
      >
        <HelpOutlineIcon />
      </IconButton>
    </Tooltip>
  );
};

GuidedTour.propTypes = {
  setTourOpen: PropTypes.func,
};

export default GuidedTour;
