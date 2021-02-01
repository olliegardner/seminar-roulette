import React from "react";
import PropTypes from "prop-types";
import { Container, makeStyles } from "@material-ui/core";

import Topbar from "./Topbar/Topbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    paddingTop: 56,
    maxWidth: "100vw",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64,
    },
  },
  content: {
    minHeight: "calc(100vh - 56px)",
    [theme.breakpoints.up("sm")]: {
      minHeight: "calc(100vh - 64px)",
    },
    height: "100%",
    maxWidth: "100%",
    flex: "1 1 auto",
    backgroundColor: theme.palette.background.default,
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const Layout = (props) => {
  const { children, themeType, setThemeType } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar themeType={themeType} setThemeType={setThemeType} />

      <main className={classes.content}>
        <Container className={classes.container}>{children}</Container>
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  themeType: PropTypes.string,
  setThemeType: PropTypes.func,
};

export default Layout;
