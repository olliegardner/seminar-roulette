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
  FormControlLabel,
  Checkbox,
  FormGroup,
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
      {value === index && <Box p={3}>{children}</Box>}
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
}));

const TabsContainer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const user = useContext(UserContext);

  const notAuthenticated = user.guid == "None";

  const [value, setValue] = useState(0);
  const [showRated, setShowRated] = useState(false);
  const [showDiscarded, setShowDiscarded] = useState(false);

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
          <Tab label="All" />
          <Tab label="Recommendations" />
          <Tab label="In an hour" />
          <Tab label="Today" />
          <Tab label="Tomorrow" />
          <Tab label="This week" />
          <Tab label="This month" />
          <Tab label="Past" />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <TabSeminars
          request="api/seminars.json"
          notFoundText="No seminars found."
          showRatings={false}
          showPagination={true}
        />
      </TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction}>
        {notAuthenticated ? (
          <Typography>
            Please{" "}
            <Link component={RouterLink} to="/login">
              login
            </Link>{" "}
            to view seminars recommended to you.
          </Typography>
        ) : (
          <>
            <Typography variant="h6">
              Recommendations based on how you have rated past seminars
            </Typography>

            <TabSeminars
              request={`api/user/recommendations.json?guid=${user.guid}`}
              notFoundText="No seminar recommendations found based on your ratings. Please rate some past seminars first!"
              showRatings={false}
              showPagination={false}
            />

            <Typography variant="h6" className={classes.recommendationText}>
              Recommendations based your personal interests
            </Typography>

            <TabSeminars
              request={`api/seminar/similarities.json?guid=${user.guid}`}
              notFoundText="No seminar recommendations found based on your interests. Please enter your personal interests."
              showRatings={true}
              showPagination={true}
            />
          </>
        )}
      </TabPanel>

      <TabPanel value={value} index={2} dir={theme.direction}>
        <TabSeminars
          request="api/seminars/time.json?time=hour"
          notFoundText="No seminars happening in an hour."
          showRatings={false}
          showPagination={true}
        />
      </TabPanel>

      <TabPanel value={value} index={3} dir={theme.direction}>
        <TabSeminars
          request="api/seminars/time.json?time=today"
          notFoundText="No seminars happening today."
          showRatings={false}
          showPagination={true}
        />
      </TabPanel>

      <TabPanel value={value} index={4} dir={theme.direction}>
        <TabSeminars
          request="api/seminars/time.json?time=tomorrow"
          notFoundText="No seminars happening tomorrow."
          showRatings={false}
          showPagination={true}
        />
      </TabPanel>

      <TabPanel value={value} index={5} dir={theme.direction}>
        <TabSeminars
          request="api/seminars/time.json?time=week"
          notFoundText="No seminars happening this week."
          showRatings={false}
          showPagination={true}
        />
      </TabPanel>

      <TabPanel value={value} index={6} dir={theme.direction}>
        <TabSeminars
          request="api/seminars/time.json?time=month"
          notFoundText="No seminars happening this month."
          showRatings={false}
          showPagination={true}
        />
      </TabPanel>

      <TabPanel value={value} index={7} dir={theme.direction}>
        {notAuthenticated ? (
          <Typography>
            Please{" "}
            <Link component={RouterLink} to="/login">
              login
            </Link>{" "}
            to view and rate seminars in the past.
          </Typography>
        ) : (
          <>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showRated}
                    onChange={(e) => setShowRated(e.target.checked)}
                    name="rated"
                  />
                }
                label="Show previously rated seminars"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showDiscarded}
                    onChange={(e) => setShowDiscarded(e.target.checked)}
                    name="discarded"
                  />
                }
                label="Show discarded seminars"
              />
            </FormGroup>

            <TabSeminars
              request={`api/seminars/past.json?guid=${
                user.guid
              }&rated=${showRated.toString()}&discarded=${showDiscarded.toString()}`}
              notFoundText="No past seminars found."
              showRatings={true}
              showPagination={true}
            />
          </>
        )}
      </TabPanel>
    </div>
  );
};

TabsContainer.propTypes = {
  selectedYear: PropTypes.number,
  data: PropTypes.object,
};

export default TabsContainer;
