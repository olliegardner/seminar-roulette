import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "axios";
import Cookies from "js-cookie";
import parse from "html-react-parser";
import {
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Chip,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { grey } from "@material-ui/core/colors";
import ClearIcon from "@material-ui/icons/Clear";
import FastfoodOutlinedIcon from "@material-ui/icons/FastfoodOutlined";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import UserContext from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  accordion: {
    "&:hover": {
      backgroundColor: grey[200],
    },
  },
  accordionColumn: {
    flexDirection: "column",
    width: "100%",
  },
  accordionDetails: {
    marginTop: theme.spacing(-2),
  },
  avatarContainer: {
    display: "flex",
    flex: "0 0 auto",
    marginRight: theme.spacing(2),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  content: {
    flex: "1 1 auto",
  },
  date: {
    textAlign: "center",
    fontSize: 12,
  },
  flexGrow: {
    flexGrow: 1,
  },
  spaceRight: {
    marginRight: theme.spacing(1),
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
  truncatedDescription: {
    marginTop: theme.spacing(1),
  },
  seminarActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: theme.spacing(-6),
    marginTop: theme.spacing(1),
  },
}));

const truncate = (str) => {
  return str.length > 180 ? str.substring(0, 180) + "..." : str;
};

const SeminarActions = (props) => {
  const {
    seminar,
    loaded,
    keywords,
    currentlyDiscarded,
    currentRating,
  } = props;
  const classes = useStyles();

  return (
    <>
      {!seminar.is_future && !currentlyDiscarded && (
        <Rating
          name={`rating-${seminar.id}`}
          defaultValue={currentRating}
          precision={1}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            setSeminarAttended(seminar.id, false, e.target.value)
          }
        />
      )}

      <div className={classes.flexGrow} />

      {loaded ? (
        <>
          {keywords.slice(0, 3).map((keyword) => (
            <Chip
              label={keyword.text}
              variant="outlined"
              color="primary"
              className={classes.spaceRight}
            />
          ))}
        </>
      ) : (
        <Chip
          label="Loading"
          variant="outlined"
          color="primary"
          className={classes.spaceRight}
        />
      )}

      {seminar.online && (
        <Tooltip
          title="Online seminar"
          placement="top"
          className={classes.spaceRight}
        >
          <LanguageOutlinedIcon color="secondary" />
        </Tooltip>
      )}

      {seminar.serves_food && (
        <Tooltip
          title="This seminar serves food!"
          placement="top"
          className={classes.spaceRight}
        >
          <FastfoodOutlinedIcon color="secondary" />
        </Tooltip>
      )}
    </>
  );
};

const SeminarCard = (props) => {
  const {
    seminar,
    currentRating,
    currentlyDiscarded,
    seminarsUpdated,
    setSeminarsUpdated,
  } = props;

  const classes = useStyles();
  const user = useContext(UserContext);
  const csrftoken = Cookies.get("csrftoken");

  const startTime = moment(seminar.start_time);
  const startDay = startTime.format("D");
  const startMonth = startTime.format("MMM").toUpperCase();
  const startYear = startTime.format("YY");

  const [keywords, setKeywords] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/seminar/keywords.json?id=${seminar.id}`)
      .then((res) => {
        setKeywords(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

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
      .then(() => setSeminarsUpdated(seminarsUpdated + 1))
      .catch((err) => console.log(err));
  };

  return (
    <Accordion
      variant="outlined"
      onChange={() => setExpanded(!expanded)}
      className={classes.accordion}
    >
      <AccordionSummary
        id={`seminar=${seminar.id}`}
        expandIcon={<ExpandMoreIcon color="primary" />}
      >
        <div className={classes.accordionColumn}>
          <div className={classes.header}>
            <div className={classes.avatarContainer}>
              <Avatar
                aria-label="seminar"
                variant="rounded"
                className={classes.avatar}
              >
                <span className={classes.date}>
                  <b style={{ fontSize: 14 }}>{startDay}</b>
                  <br />
                  {startMonth}
                  <br />
                  {startYear}
                </span>
              </Avatar>
            </div>

            <div className={classes.content}>
              <Typography variant="body2" component="span" display="block">
                <b style={{ fontSize: 16 }}>{seminar.title}</b>
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
                display="block"
              >
                {startTime.format("H:mm") +
                  " - " +
                  moment(seminar.end_time).format("H:mm")}
              </Typography>
            </div>
          </div>

          {/* {action && <div className={classes.action}>{action}</div>} */}

          {!expanded && (
            <>
              <Typography
                variant="body2"
                component="p"
                className={classes.truncatedDescription}
              >
                {parse(truncate(seminar.description))}
              </Typography>

              <div className={classes.seminarActions}>
                <SeminarActions
                  seminar={seminar}
                  loaded={loaded}
                  keywords={keywords}
                  currentlyDiscarded={currentlyDiscarded}
                  currentRating={currentRating}
                />
              </div>
            </>
          )}
        </div>
      </AccordionSummary>

      <AccordionDetails className={classes.accordionDetails}>
        <Typography variant="body2" component="p">
          {parse(seminar.description)}
        </Typography>
      </AccordionDetails>

      <AccordionActions disableSpacing>
        <SeminarActions
          seminar={seminar}
          loaded={loaded}
          keywords={keywords}
          currentlyDiscarded={currentlyDiscarded}
          currentRating={currentRating}
        />
      </AccordionActions>
    </Accordion>
  );
};

SeminarCard.propTypes = {
  seminar: PropTypes.object,
  currentRating: PropTypes.number,
  currentlyDiscarded: PropTypes.bool,
  seminarsUpdated: PropTypes.number,
  setSeminarsUpdated: PropTypes.func,
};

export default SeminarCard;
