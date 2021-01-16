import React, { useState } from "react";
import { Box, Button, makeStyles, MenuItem, Popover } from "@material-ui/core";
import SortOutlinedIcon from "@material-ui/icons/SortOutlined";

const useStyles = makeStyles((theme) => ({
  sort: {
    marginRight: theme.spacing(1.5),
  },
  flexGrow: {
    flexGrow: 1,
  },
}));

const Filters = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const isOpen = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  const handleOpen = (e) => setAnchorEl(e.currentTarget);

  return (
    <>
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
        <Box py={1}>
          <MenuItem color="inherit">Seminar title A-Z</MenuItem>
          <MenuItem color="inherit">Seminar title Z-A</MenuItem>
          <MenuItem color="inherit">Date closest to now</MenuItem>
          <MenuItem color="inherit">Date farthest from now</MenuItem>
        </Box>
      </Popover>
    </>
  );
};

export default Filters;
