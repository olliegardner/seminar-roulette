import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Hidden, Typography } from "@material-ui/core";

import ProfileMenu from "./ProfileMenu";
import HistoryMenu from "./HistoryMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  titleLink: {
    display: "flex",
    alignItems: "inherit",
    textDecoration: "none",
    color: "white",
  },
  flexGrow: {
    flexGrow: 1,
  },
}));

const Topbar = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <Hidden mdDown>
          <RouterLink to="/" className={classes.titleLink}>
            <Typography variant="h5">
              <b>Seminar Roulette</b>
            </Typography>
          </RouterLink>
        </Hidden>

        <div className={classes.flexGrow} />

        <HistoryMenu />
        <ProfileMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

Topbar.propTypes = {
  className: PropTypes.string,
};
