import React from "react";
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

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: theme.palette.primary.main,
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
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <HideOnScroll {...props}>
      <AppBar {...rest} className={clsx(classes.root, className)}>
        <Toolbar>
          <Hidden smDown>
            <RouterLink to="/" className={classes.titleLink}>
              <Typography variant="h5">
                <b>Seminar Roulette</b>
              </Typography>
            </RouterLink>
          </Hidden>

          <div className={classes.flexGrow} />
          <SearchBar />
          <div className={classes.flexGrow} />

          {/* <TopbarButton
            text="Recommendations"
            icon={<FavoriteBorderOutlinedIcon />}
            href="recommendations"
          />
          <TopbarButton
            text="History"
            icon={<RateReviewOutlinedIcon />}
            href="history"
          /> */}
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
};

export default Topbar;
