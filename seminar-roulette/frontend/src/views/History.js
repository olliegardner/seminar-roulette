import React, { useState, useEffect, useContext, Fragment } from "react";
import axios from "axios";
import { Box, Chip, makeStyles, Grid, Typography } from "@material-ui/core";
import UserContext from "../context/UserContext";
import HistoryCard from "../components/HistoryCard";
import LoadingSpinner from "../components/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const History = () => {
  const classes = useStyles();
  const user = useContext(UserContext);

  const [history, setHistory] = useState([]);
  const [historyUpdated, setHistoryUpdated] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`api/seminars/history.json?guid=${user.guid}`)
      .then((res) => {
        setHistory(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [historyUpdated]);

  return (
    <div className={classes.root}>
      {loaded ? (
        <Fragment>
          <Box mb={1}>
            <Typography variant="h5">
              Seminar History{" "}
              <Chip label={history.length} size="small" color="secondary" />
            </Typography>
          </Box>

          {history.length > 0 ? (
            <Grid container spacing={3}>
              {history.map((history) => (
                <Grid item key={history.seminar.id} xs={12} sm={6} md={4}>
                  <HistoryCard
                    seminar={history.seminar}
                    historyUpdated={historyUpdated}
                    setHistoryUpdated={setHistoryUpdated}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No seminar history found.</Typography>
          )}
        </Fragment>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

History.propTypes = {};

export default History;
