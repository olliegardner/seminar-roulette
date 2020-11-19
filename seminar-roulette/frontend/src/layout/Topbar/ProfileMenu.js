import React, { useState, useContext, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  MenuItem,
  Popover,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

import UserContext from "../../context/UserContext";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.icon,
    display: "flex",
    justifyContent: "center",
  },
  column: {
    flexDirection: "column",
  },
}));

const ProfileMenu = () => {
  const user = useContext(UserContext);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const isOpen = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);

  return (
    <Fragment>
      <Box mx={1}>
        <Button onClick={handleOpen}>
          <div className={classes.column}>
            <div className={classes.icon}>
              <AccountCircleOutlinedIcon />
            </div>
            <Typography variant="caption" component="span">
              Profile
            </Typography>
          </div>
          <ExpandMoreIcon />
        </Button>
      </Box>

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
            width: "18ch",
          },
        }}
        elevation={1}
      >
        <Box py={1}>
          <MenuItem color="inherit" disabled>
            {user.name}
            <br />
            {user.guid}
          </MenuItem>
          <MenuItem component={RouterLink} to={"/logout"} color="inherit">
            Sign out
          </MenuItem>
        </Box>
      </Popover>
    </Fragment>
  );
};

export default ProfileMenu;
