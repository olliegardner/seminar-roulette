import React, { useState } from "react";
import PropTypes from "prop-types";
import Tour from "reactour";
import { Container, makeStyles, useTheme } from "@material-ui/core";

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

const steps = [
  {
    selector: "#heading",
    content:
      "Welcome to Seminar Roulette, a platform which allows you to discover research seminars taking place at the University of Glasgow.",
  },
  {
    selector: "#user-interests",
    content:
      "Enter up to 5 of your personal interests here. After entering your interests, Seminar Roulette will calculate the similarity between what you have entered and a seminar's keywords.",
  },
  {
    selector: "#tabs",
    content:
      "Use the tabs to find your seminar recommendations, upcoming seminars, past seminars and a random seminar. In the past tab, you are able to rate past seminars which will enable the system to make recommendations to you.",
  },
  {
    selector: "#filters",
    content: "Filter or sort seminars by certain characteristics.",
  },
  {
    selector: "#seminar",
    content:
      "Seminars are displayed in a list view where you are able to view their details. Click on the seminar to find out more!",
  },
  {
    selector: "#search",
    content: "Search for seminars using keywords.",
  },
  {
    selector: "#theme",
    content: "Click this button to toggle between light and dark mode.",
  },
];

const Layout = (props) => {
  const { children, themeType, setThemeType } = props;

  const classes = useStyles();
  const theme = useTheme();

  const [tourOpen, setTourOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Topbar
        themeType={themeType}
        setThemeType={setThemeType}
        setTourOpen={setTourOpen}
      />

      <main className={classes.content}>
        <Container className={classes.container}>{children}</Container>
      </main>

      <Tour
        steps={steps}
        isOpen={tourOpen}
        onRequestClose={() => setTourOpen(false)}
        accentColor={theme.palette.secondary.main}
      />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  themeType: PropTypes.string,
  setThemeType: PropTypes.func,
};

export default Layout;
