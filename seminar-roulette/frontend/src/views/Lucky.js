import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Box, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import { useAnimatePresence } from "use-animate-presence";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    minHeight: "100vh",
  },
  seminarCard: {
    backgroundColor: "#f67e7d",
  },
  seminarBox: {
    maxHeight: 500,
    overflow: "auto",
  },
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
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
                  <Card className={classes.seminarCard}>
                    <Box
                      p={2}
                      textAlign="center"
                      className={classes.seminarBox}
                    >
                      <Typography variant="h4">{seminar.title}</Typography>
                      <br />

                      <Typography>
                        <span className={classes.wrapIcon}>
                          <ScheduleOutlinedIcon />{" "}
                          {moment(seminar.start_time).format("Do MMMM YYYY")},{" "}
                          {moment(seminar.start_time).format("H:mm")} -{" "}
                          {moment(seminar.end_time).format("H:mm")}
                        </span>
                      </Typography>

                      <Typography>
                        <span className={classes.wrapIcon}>
                          <PersonOutlineOutlinedIcon />{" "}
                          {seminar.speaker.speaker}
                        </span>
                      </Typography>

                      <Typography>
                        <span className={classes.wrapIcon}>
                          <LocationOnOutlinedIcon /> {seminar.location.location}
                        </span>
                      </Typography>

                      <br />
                      <Typography>{seminar.description}</Typography>
                    </Box>
                  </Card>
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
