import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Box, Card, makeStyles, Typography } from "@material-ui/core";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

const useStyles = makeStyles((theme) => ({
  seminarCard: {
    backgroundColor: theme.palette.primary.main,
  },
  seminarBox: {
    maxHeight: 500,
    overflow: "auto",
  },
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
  whiteText: {
    color: theme.palette.common.white,
  },
}));

const SeminarCard = (props) => {
  const { seminar } = props;
  const classes = useStyles();

  return (
    <Card className={classes.seminarCard}>
      <Box p={2} textAlign="center" className={classes.seminarBox}>
        <Typography variant="h4" className={classes.whiteText}>
          {seminar.title}
        </Typography>
        <br />

        <Typography className={classes.whiteText}>
          <span className={classes.wrapIcon}>
            <ScheduleOutlinedIcon />{" "}
            {moment(seminar.start_time).format("Do MMMM YYYY")},{" "}
            {moment(seminar.start_time).format("H:mm")} -{" "}
            {moment(seminar.end_time).format("H:mm")}
          </span>
        </Typography>

        <Typography className={classes.whiteText}>
          <span className={classes.wrapIcon}>
            <PersonOutlineOutlinedIcon /> {seminar.speaker.speaker}
          </span>
        </Typography>

        <Typography className={classes.whiteText}>
          <span className={classes.wrapIcon}>
            <LocationOnOutlinedIcon /> {seminar.location.location}
          </span>
        </Typography>

        <br />
        <Typography className={classes.whiteText}>
          {seminar.description}
        </Typography>
      </Box>
    </Card>
  );
};

SeminarCard.propTypes = {
  seminar: PropTypes.object,
};

export default SeminarCard;
