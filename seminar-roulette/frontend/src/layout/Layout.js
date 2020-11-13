import React, { useState } from "react";
import PropTypes from "prop-types";
import { Fab, makeStyles } from "@material-ui/core";
import CasinoOutlinedIcon from "@material-ui/icons/CasinoOutlined";

import Topbar from "./Topbar/Topbar";
import RandomSeminarDialog from "../components/RandomSeminarDialog";

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
    flex: "1 1 auto",
    backgroundColor: theme.palette.background.dark,
  },
  wrapper: {
    padding: theme.spacing(3),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Layout = (props) => {
  const { children } = props;
  const classes = useStyles();

  const [fabOpen, setFabOpen] = useState(false);

  const handleFabOpen = () => {
    setFabOpen(true);
  };

  const handleFabClose = () => {
    setFabOpen(false);
  };

  return (
    <div className={classes.root}>
      <Topbar />

      <main className={classes.content}>
        <div className={classes.wrapper}>{children}</div>
      </main>

      <Fab
        color="primary"
        variant="extended"
        className={classes.fab}
        onClick={handleFabOpen}
      >
        <CasinoOutlinedIcon className={classes.fabIcon} />
        Random Seminar
      </Fab>
      <RandomSeminarDialog open={fabOpen} onClose={handleFabClose} />
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node,
};
