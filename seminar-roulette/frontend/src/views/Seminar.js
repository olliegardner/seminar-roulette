import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Redirect, useParams } from "react-router-dom";
import { Box, Typography, makeStyles, Paper } from "@material-ui/core";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";

import LoadingSpinner from "../components/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
    marginBottom: theme.spacing(0.5),
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

const Seminar = () => {
  const { seminarId } = useParams();
  const classes = useStyles();

  const [seminar, setSeminar] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/seminar.json?id=${seminarId}`)
      .then((res) => {
        setSeminar(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        if (err.response.status == 404) setNotFound(true);
      });
  }, []);

  return notFound ? (
    <Redirect to="/404" />
  ) : loaded ? (
    <Paper variant="outlined">
      <Box p={2}>
        <Typography variant="h4">{seminar.title}</Typography>
        <br />

        <Typography>
          <span className={classes.wrapIcon}>
            <CalendarTodayOutlinedIcon className={classes.icon} />
            {moment(seminar.start_time).format("Do MMMM YYYY")}
          </span>
        </Typography>

        <Typography>
          <span className={classes.wrapIcon}>
            <ScheduleOutlinedIcon className={classes.icon} />
            {moment(seminar.start_time).format("H:mm")} -{" "}
            {moment(seminar.end_time).format("H:mm")}
          </span>
        </Typography>

        <Typography>
          <span className={classes.wrapIcon}>
            <PersonOutlineOutlinedIcon className={classes.icon} />
            {seminar.speaker.speaker}
          </span>
        </Typography>

        <Typography>
          <span className={classes.wrapIcon}>
            <LocationOnOutlinedIcon className={classes.icon} />
            {seminar.location.location}
          </span>
        </Typography>

        <br />
        <Typography>{seminar.description}</Typography>
      </Box>
    </Paper>
  ) : (
    <LoadingSpinner />
  );
};

Seminar.propTypes = {};

export default Seminar;
