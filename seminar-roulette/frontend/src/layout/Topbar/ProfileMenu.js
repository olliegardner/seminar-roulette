import React, { useState, useContext, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Hidden, MenuItem, Popover } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import UserContext from "../../context/UserContext";

const ProfileMenu = () => {
  const user = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const isOpen = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);

  return (
    <Fragment>
      <Button onClick={handleOpen} color="inherit">
        <Hidden xsDown>{user.name} (</Hidden>
        {user.guid}
        <Hidden xsDown>)</Hidden>
        <ExpandMoreIcon />
      </Button>

      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "15ch",
          },
        }}
      >
        <Box py={1}>
          <MenuItem component={RouterLink} to={"/logout"} color="inherit">
            Sign out
          </MenuItem>
        </Box>
      </Popover>
    </Fragment>
  );
};

export default ProfileMenu;
