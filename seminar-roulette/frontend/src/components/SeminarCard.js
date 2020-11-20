import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, makeStyles, Paper, Typography } from "@material-ui/core";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";

const useStyles = makeStyles((theme) => ({
  seminarCard: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
  },
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

const SeminarCard = (props) => {
  const { seminar } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.seminarCard}>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          {seminar.title}
        </Typography>

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

        <span className={classes.wrapIcon}>
          <PersonOutlineOutlinedIcon className={classes.icon} />
          {seminar.speaker != null ? (
            <Typography>{seminar.speaker.speaker}</Typography>
          ) : (
            <Typography>-</Typography>
          )}
        </span>

        <br />

        <span className={classes.wrapIcon}>
          <LocationOnOutlinedIcon className={classes.icon} />
          {seminar.location != null ? (
            <Typography>{seminar.location.location}</Typography>
          ) : (
            <Typography>-</Typography>
          )}
        </span>

        <br />

        <Button
          variant="outlined"
          color="secondary"
          component={RouterLink}
          to={`/seminar/${seminar.id}`}
        >
          View Seminar
        </Button>
      </Box>
    </Paper>
  );
};

SeminarCard.propTypes = {
  seminar: PropTypes.object,
};

export default SeminarCard;
