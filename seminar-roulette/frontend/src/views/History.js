import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
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
  const [historyUpdated, setHistoryUpdated] = useState({});
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
        <Fragment>
          {history.map((history) => (
            <HistoryCard
              seminar={history.seminar}
              historyUpdated={historyUpdated}
              setHistoryUpdated={setHistoryUpdated}
            />
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default History;

History.propTypes = {};
