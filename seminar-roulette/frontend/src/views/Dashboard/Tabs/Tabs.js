import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  makeStyles,
  useTheme,
  Tabs,
  Tab,
  AppBar,
  Box,
  Typography,
  Link,
} from "@material-ui/core";

import UserContext from "../../../context/UserContext";
import TabSeminars from "./TabSeminars";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box py={3}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100vw",
  },
  recommendationText: {
    marginTop: theme.spacing(4),
  },
  tabChip: {
    verticalAlign: "middle",
  },
}));

const TabsContainer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const user = useContext(UserContext);

  const notAuthenticated = user.guid == "None";

  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
        >
          <Tab label="Recommendations" />
          <Tab label="Upcoming" />
          <Tab label="Past" />
          <Tab label="Random" />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        {notAuthenticated ? (
          <Typography>
            Please{" "}
            <Link component={RouterLink} to="/login">
              login
            </Link>{" "}
            to view seminars recommended to you.
          </Typography>
        ) : (
          <TabSeminars
            label="recommendations"
            request={`api/user/recommendations.json?guid=${user.guid}`}
            notFoundText="No seminar recommendations found based on your ratings. Please rate some past seminars first!"
            showRatings={false}
          />
        )}
      </TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction}>
        <TabSeminars
          label="upcoming"
          request="api/seminars/upcoming.json"
          notFoundText="No upcoming seminars found."
          showRatings={false}
        />
      </TabPanel>

      <TabPanel value={value} index={2} dir={theme.direction}>
        {notAuthenticated ? (
          <Typography>
            Please{" "}
            <Link component={RouterLink} to="/login">
              login
            </Link>{" "}
            to view and rate seminars in the past.
          </Typography>
        ) : (
          <TabSeminars
            label="past"
            request={`api/seminars/past.json?guid=${user.guid}`}
            notFoundText="No past seminars found."
            showRatings={true}
          />
        )}
      </TabPanel>

      <TabPanel value={value} index={3} dir={theme.direction}>
        <TabSeminars
          label="random"
          request={`api/seminars/random.json?guid=${user.guid}`}
          notFoundText="No seminars found."
          showRatings={false}
        />
      </TabPanel>
    </div>
  );
};

export default TabsContainer;
