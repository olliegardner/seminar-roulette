import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Box, Button, Card, makeStyles, Typography } from "@material-ui/core";
import UserContext from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  seminarCard: {
    backgroundColor: "#f67e7d",
    marginBottom: theme.spacing(3),
  },
}));

const History = () => {
  const classes = useStyles();
  const user = useContext(UserContext);
  const csrftoken = Cookies.get("csrftoken");

  const [history, setHistory] = useState([]);
  const [historyUpdated, setHistoryUpdated] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const setSeminarAttended = (seminarId, discarded) => {
    axios
      .put(
        `/api/seminars/history/attended.json?guid=${user.guid}`,
        { seminar: seminarId, rating: 6, discarded: discarded },
        {
          headers: {
            "X-CSRFToken": csrftoken,
          },
        }
      )
      .then(() => {
        setHistoryUpdated(historyUpdated + 1);
      })
      .catch((err) => console.log(err));
  };

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
            <Card className={classes.seminarCard}>
              <Box p={2} textAlign="center">
                <Typography variant="h6">{history.seminar.title}</Typography>
                <Typography>ID: {history.seminar.id}</Typography>
                <Typography>
                  Did you attend this seminar? If so, what would you rate it?
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setSeminarAttended(history.seminar.id, false)}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setSeminarAttended(history.seminar.id, true)}
                >
                  No
                </Button>
              </Box>
            </Card>
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default History;

History.propTypes = {};
