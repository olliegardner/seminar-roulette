import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles, Grid } from "@material-ui/core";
import UserContext from "../context/UserContext";
import HistoryCard from "../components/HistoryCard";

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
      {loaded && (
        <Grid container spacing={3}>
          {history.map((history) => (
            <Grid item key={history.seminar.id} xs={12} sm={6} md={4} lg={3}>
              <HistoryCard
                seminar={history.seminar}
                historyUpdated={historyUpdated}
                setHistoryUpdated={setHistoryUpdated}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default History;

History.propTypes = {};
