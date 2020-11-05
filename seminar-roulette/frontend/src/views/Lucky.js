import React, { Fragment, useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useAnimatePresence } from "use-animate-presence";
import { Link } from "react-router-dom";

import SeminarCard from "../components/SeminarCard";
import UserContext from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    minHeight: "90vh",
  },
}));

const diff = window.innerWidth / 2 + 300;
const variants = {
  x: { from: -diff, to: 0 },
};

const Lucky = () => {
  const classes = useStyles();
  const user = useContext(UserContext);

  const csrftoken = Cookies.get("csrftoken");

  const [seminar, setSeminar] = useState({});
  const [loaded, setLoaded] = useState(true);

  const params = new URLSearchParams(window.location.search);
  const time = params.get("time");

  const animatedDiv = useAnimatePresence({
    variants,
    initial: "hidden",
  });

  useEffect(() => {
    axios
      .get(`api/seminars/random.json?time=${time}&guid=${user.guid}`)
      .then((res) => {
        setSeminar(res.data);
        setLoaded(true);
        animatedDiv.togglePresence();

        if (res.data != "No seminar found") {
          axios
            .post(
              `api/seminars/history.json`,
              {
                guid: user.guid,
                seminar: res.data.id,
              },
              {
                headers: {
                  "X-CSRFToken": csrftoken,
                },
              }
            )
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.root}>
      {loaded && (
        <Fragment>
          {animatedDiv.isRendered && (
            <div ref={animatedDiv.ref}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                className={classes.grid}
              >
                {seminar == "No seminar found" ? (
                  <Fragment>
                    <Typography variant="h5">No seminar found!</Typography>
                    <br />
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to="/"
                    >
                      Spin Again
                    </Button>
                  </Fragment>
                ) : (
                  <Grid item xs={12} sm={10} md={6}>
                    <SeminarCard seminar={seminar} />
                  </Grid>
                )}
              </Grid>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Lucky;
