import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Box, Card, makeStyles, Typography } from "@material-ui/core";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

const useStyles = makeStyles((theme) => ({
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

const SeminarCard = (props) => {
  const { seminar } = props;
  const classes = useStyles();

  return (
    <Card className={classes.seminarCard}>
      <Box p={2} textAlign="center" className={classes.seminarBox}>
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
            <PersonOutlineOutlinedIcon /> {seminar.speaker.speaker}
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
  );
};

export default SeminarCard;

SeminarCard.propTypes = {
  seminar: PropTypes.object,
};
