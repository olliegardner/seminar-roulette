import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Hidden,
  Slide,
  Typography,
  useScrollTrigger,
  makeStyles,
} from "@material-ui/core";

import ProfileMenu from "./ProfileMenu";
import SearchBar from "./SearchBar";
import ToggleTheme from "./ToggleTheme";
import UserContext from "../../context/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor:
      theme.palette.type == "light"
        ? theme.palette.primary.main
        : theme.palette.background.paper,
  },
  titleLink: {
    display: "flex",
    alignItems: "inherit",
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  flexGrow: {
    flexGrow: 1,
  },
  favicon: {
    marginRight: theme.spacing(1),
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const HideOnScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const Topbar = (props) => {
  const { className, themeType, setThemeType, ...rest } = props;

  const classes = useStyles();

  const user = useContext(UserContext);
  const notAuthenticated = user.guid == "None";

  return (
    <HideOnScroll {...props}>
      <AppBar {...rest} className={clsx(classes.root, className)}>
        <Toolbar>
          <Hidden smDown>
            <RouterLink to="/" className={classes.titleLink}>
              <img
                src={"../../../static/favicon.ico"}
                className={classes.favicon}
              />

              <Typography variant="h5">
                <b>Seminar Roulette</b>
              </Typography>
            </RouterLink>
          </Hidden>

          <div className={classes.flexGrow} />

          <SearchBar />

          <div className={classes.flexGrow} />

          {!notAuthenticated && (
            <ToggleTheme themeType={themeType} setThemeType={setThemeType} />
          )}
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  themeType: PropTypes.string,
  setThemeType: PropTypes.func,
};

export default Topbar;
