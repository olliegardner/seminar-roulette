import React, { useState, useEffect, useContext, Fragment } from "react";
import axios from "axios";
import { Box, Chip, makeStyles, Grid, Typography } from "@material-ui/core";

import UserContext from "../context/UserContext";
import SeminarCard from "../components/SeminarCard";
import LoadingSpinner from "../components/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Recommendations = () => {
  const classes = useStyles();
  const user = useContext(UserContext);

  const [recommendations, setRecommendations] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`api/user/recommendations.json?guid=${user.guid}`)
      .then((res) => {
        setRecommendations(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.root}>
      {loaded ? (
        <Fragment>
          <Box mb={1}>
            <Typography variant="h5">
              Your Recommendations{" "}
              <Chip
                label={recommendations.length}
                size="small"
                color="secondary"
              />
            </Typography>
          </Box>

          {recommendations.length > 0 ? (
            <Grid container spacing={3}>
              {recommendations.map((recommendation) => (
                <Grid item key={recommendation.id} xs={12} sm={6} md={4}>
                  <SeminarCard seminar={recommendation} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No seminar recommendations found.</Typography>
          )}
        </Fragment>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

Recommendations.propTypes = {};

export default Recommendations;
