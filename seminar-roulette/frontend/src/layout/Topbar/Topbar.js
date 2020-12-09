import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Hidden,
  InputBase,
  Slide,
  Typography,
  useScrollTrigger,
  fade,
  makeStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import ProfileMenu from "./ProfileMenu";

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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
      "&:focus": {
        width: "40ch",
      },
    },
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
  const history = useHistory();

  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) {
      history.push(`/search/${search}`);
      setSearch("");
    }
  };

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

          <form noValidate autoComplete="off" onSubmit={handleSearchSubmit}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search seminars…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
          </form>

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
