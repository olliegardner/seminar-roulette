import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Grid, makeStyles } from "@material-ui/core";
import { useAnimatePresence } from "use-animate-presence";
import SeminarCard from "../components/SeminarCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    minHeight: "100vh",
  },
}));

const diff = window.innerWidth / 2 + 300;
const variants = {
  x: { from: -diff, to: 0 },
};

const Lucky = () => {
  const classes = useStyles();

  const [seminar, setSeminar] = useState({});
  const [loaded, setLoaded] = useState(false);

  const animatedDiv = useAnimatePresence({
    variants,
    initial: "hidden",
  });

  useEffect(() => {
    axios
      .get(`api/seminars/random.json`)
      .then((res) => {
        setSeminar(res.data);
        setLoaded(true);
        animatedDiv.togglePresence();
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
                <Grid item xs={12} sm={10} md={6}>
                  <SeminarCard seminar={seminar} />
                </Grid>
              </Grid>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Lucky;
