import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Link,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
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
    <Paper variant="outlined" className={classes.seminarCard}>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          <Link color="inherit" href={`/seminar/${seminar.id}`}>
            {seminar.title}
          </Link>
        </Typography>

        <Typography>
          <span className={classes.wrapIcon}>
            <CalendarTodayOutlinedIcon className={classes.icon} />
            {moment(seminar.start_time).format("Do MMMM YYYY")}
          </span>
        </Typography>

        <Typography className={classes.whiteText}>
          <span className={classes.wrapIcon}>
            <ScheduleOutlinedIcon className={classes.icon} />
            {moment(seminar.start_time).format("H:mm")} -{" "}
            {moment(seminar.end_time).format("H:mm")}
          </span>
        </Typography>

        <Typography className={classes.whiteText}>
          <span className={classes.wrapIcon}>
            <PersonOutlineOutlinedIcon className={classes.icon} />
            {seminar.speaker.speaker}
          </span>
        </Typography>

        <Typography className={classes.whiteText}>
          <span className={classes.wrapIcon}>
            <LocationOnOutlinedIcon className={classes.icon} />
            {seminar.location.location}
          </span>
        </Typography>

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
