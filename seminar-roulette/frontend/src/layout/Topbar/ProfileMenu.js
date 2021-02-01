import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  MenuItem,
  Popover,
  makeStyles,
  Hidden,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

import UserContext from "../../context/UserContext";

const useStyles = makeStyles((theme) => ({
  icon: {
    display: "flex",
    justifyContent: "center",
    marginRight: theme.spacing(1),
  },
  column: {
    flexDirection: "column",
  },
}));

const ProfileMenu = () => {
  const classes = useStyles();
  const user = useContext(UserContext);

  const notAuthenticated = user.guid == "None";

  const [anchorEl, setAnchorEl] = useState(null);

  const isOpen = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  const handleOpen = (e) => setAnchorEl(e.currentTarget);

  return (
    <>
      <Box mx={1}>
        {notAuthenticated ? (
          <Button
            component={RouterLink}
            to="/login"
            color="inherit"
            variant="outlined"
          >
            Login
          </Button>
        ) : (
          <Button onClick={handleOpen} color="inherit">
            <div className={classes.icon}>
              <AccountCircleOutlinedIcon />
            </div>

            <Hidden smDown>{user.name}</Hidden>
            <ExpandMoreIcon />
          </Button>
        )}
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
          <Hidden mdUp>
            <MenuItem color="inherit" disabled>
              {user.name}
            </MenuItem>
          </Hidden>
          <MenuItem color="inherit" disabled>
            {user.guid}
          </MenuItem>
          <MenuItem component={RouterLink} to={"/logout"} color="inherit">
            Sign out
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
};

export default ProfileMenu;
