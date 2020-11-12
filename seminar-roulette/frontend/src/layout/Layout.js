import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import Topbar from "./Topbar/Topbar";

import CasinoOutlinedIcon from "@material-ui/icons/CasinoOutlined";
import FastfoodOutlinedIcon from "@material-ui/icons/FastfoodOutlined";
import AutorenewOutlinedIcon from "@material-ui/icons/AutorenewOutlined";

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
  speedDial: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const actions = [
  { icon: <CasinoOutlinedIcon />, name: "Random" },
  { icon: <FastfoodOutlinedIcon />, name: "Food" },
];

const Layout = (props) => {
  const { children } = props;
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>
        <div className={classes.wrapper}>{children}</div>
      </main>
      <SpeedDial
        ariaLabel="Seminar Roulette speed dial"
        className={classes.speedDial}
        icon={<AutorenewOutlinedIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node,
};
