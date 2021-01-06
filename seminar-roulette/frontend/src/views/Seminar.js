import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Redirect, useParams } from "react-router-dom";
import ReactWordcloud from "react-wordcloud";
import parse from "html-react-parser";
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
  const [keywords, setKeywords] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: false,
    deterministic: false,
    fontSizes: [10, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };

  useEffect(() => {
    axios
      .all([
        axios.get(`/api/seminar.json?id=${seminarId}`),
        axios.get(`/api/seminar/keywords.json?id=${seminarId}`),
      ])
      .then(
        axios.spread((...res) => {
          setSeminar(res[0].data);
          setKeywords(res[1].data);
          setLoaded(true);
        })
      )
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

        <Typography>{parse(seminar.description)}</Typography>

        <ReactWordcloud words={keywords} options={options} />
      </Box>
    </Paper>
  ) : (
    <LoadingSpinner />
  );
};

Seminar.propTypes = {};

export default Seminar;
