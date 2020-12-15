import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "axios";
import Cookies from "js-cookie";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import ClearIcon from "@material-ui/icons/Clear";
import FastfoodOutlinedIcon from "@material-ui/icons/FastfoodOutlined";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";

import UserContext from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  fullHeight: {
    height: "100%",
  },
  date: {
    textAlign: "center",
    fontSize: 10,
  },
  flexGrow: {
    flexGrow: 1,
  },
  rating: {
    marginRight: theme.spacing(1),
  },
  online: {
    marginRight: theme.spacing(1),
  },
  food: {
    marginRight: theme.spacing(1),
  },
}));

const truncate = (str) => {
  return str.length > 280 ? str.substring(0, 280) + "..." : str;
};

const SeminarCard = (props) => {
  const { seminar, currentRating } = props;

  const classes = useStyles();
  const user = useContext(UserContext);
  const csrftoken = Cookies.get("csrftoken");

  const startTime = moment(seminar.start_time);
  const startDay = startTime.format("D");
  const startMonth = startTime.format("MMM").toUpperCase();
  const startYear = startTime.format("YY");

  const setSeminarAttended = (seminarId, discarded, rating) => {
    axios
      .put(
        `/api/seminar/attendance.json?guid=${user.guid}`,
        { seminar: seminarId, rating: rating, discarded: discarded },
        {
          headers: {
            "X-CSRFToken": csrftoken,
          },
        }
      )
      .catch((err) => console.log(err));
  };

  return (
    <Card variant="outlined" className={classes.fullHeight}>
      <CardActionArea
        component={RouterLink}
        to={`/seminar/${seminar.id}`}
        className={classes.fullHeight}
      >
        <CardHeader
          avatar={
            <Avatar
              aria-label="seminar"
              variant="rounded"
              className={classes.avatar}
            >
              <span className={classes.date}>
                <b style={{ fontSize: 12 }}>{startDay}</b>
                <br />
                {startMonth}
                <br />
                {startYear}
              </span>
            </Avatar>
          }
          action={
            <>
              {!seminar.is_future && (
                <IconButton
                  aria-label="clear"
                  color="secondary"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setSeminarAttended(seminar.id, true);
                  }}
                >
                  <Tooltip title="Discard seminar" placement="top">
                    <ClearIcon />
                  </Tooltip>
                </IconButton>
              )}
            </>
          }
          title={<b>{seminar.title}</b>}
          subheader={
            startTime.format("H:mm") +
            " - " +
            moment(seminar.end_time).format("H:mm")
          }
        />

        <CardContent>
          <Typography variant="body2" component="p">
            {truncate(seminar.description)}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          {!seminar.is_future && (
            <Rating
              name={`rating-${seminar.id}`}
              defaultValue={currentRating}
              precision={0.5}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) =>
                setSeminarAttended(seminar.id, false, e.target.value)
              }
            />
          )}

          <div className={classes.flexGrow} />

          {seminar.online && (
            <Tooltip
              title="Online seminar"
              placement="top"
              className={classes.online}
            >
              <LanguageOutlinedIcon color="secondary" />
            </Tooltip>
          )}

          {seminar.serves_food && (
            <Tooltip
              title="This seminar serves food!"
              placement="top"
              className={classes.food}
            >
              <FastfoodOutlinedIcon color="secondary" />
            </Tooltip>
          )}
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

SeminarCard.propTypes = {
  seminar: PropTypes.object,
  currentRating: PropTypes.number,
};

export default SeminarCard;
