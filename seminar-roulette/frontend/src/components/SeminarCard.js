import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "axios";
import Cookies from "js-cookie";
import parse from "html-react-parser";
import ReactWordcloud from "react-wordcloud";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Chip,
  IconButton,
  Link,
  makeStyles,
  Tooltip,
  Typography,
  Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { grey } from "@material-ui/core/colors";
import FastfoodOutlinedIcon from "@material-ui/icons/FastfoodOutlined";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import ClearIcon from "@material-ui/icons/Clear";
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
    flexDirection: "column",
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
    marginBottom: theme.spacing(1),
  },
  seminarActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: theme.spacing(-6),
    marginTop: theme.spacing(1),
  },
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
    marginBottom: theme.spacing(0.5),
  },
  icon: {
    marginRight: theme.spacing(0.5),
    color: theme.palette.primary.main,
  },
  addToCalendar: {
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

const SeminarActions = (props) => {
  const {
    seminar,
    keywords,
    currentlyDiscarded,
    currentRating,
    seminarsUpdated,
    setSeminarsUpdated,
  } = props;

  const classes = useStyles();
  const user = useContext(UserContext);

  const csrftoken = Cookies.get("csrftoken");
  const [downloadLink, setDownloadLink] = useState("");

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

  const icsFile = () => {
    const data = new Blob([seminar.icalendar], { type: "text/plain" });
    if (downloadLink !== "") window.URL.revokeObjectURL(downloadLink);
    setDownloadLink(window.URL.createObjectURL(data));
  };

  return (
    <>
      {seminar.is_future && (
        <Button
          variant="text"
          color="primary"
          startIcon={<EventOutlinedIcon />}
          component={Link}
          download="seminar.ics"
          href={downloadLink}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            icsFile();
            e.stopPropagation();
          }}
          className={classes.addToCalendar}
        >
          Add to Calendar
        </Button>
      )}

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
          disabled={currentlyDiscarded}
        >
          <Tooltip
            title={
              currentlyDiscarded
                ? "Seminar already discarded"
                : "Discard seminar"
            }
            placement="top"
          >
            <ClearIcon />
          </Tooltip>
        </IconButton>
      )}

      <div className={classes.flexGrow} />

      {keywords.slice(0, 3).map((keyword) => (
        <Chip
          label={keyword.text}
          variant="outlined"
          color="primary"
          className={classes.spaceRight}
        />
      ))}

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

  const startTime = moment(seminar.start_time);
  const startDay = startTime.format("D");
  const startMonth = startTime.format("MMM").toUpperCase();
  const startYear = startTime.format("YY");

  const keywords = JSON.parse(seminar.keywords);

  const [expanded, setExpanded] = useState(false);

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
    transitionDuration: 500,
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

          <Typography>
            <span className={classes.wrapIcon}>
              <PersonOutlineOutlinedIcon className={classes.icon} />
              {seminar.speaker.url ? (
                <Link
                  target="_blank"
                  rel="noopener"
                  href={
                    seminar.speaker.url.startsWith("http")
                      ? seminar.speaker.url
                      : "http://" + seminar.speaker.url
                  }
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                >
                  {seminar.speaker.speaker}
                </Link>
              ) : (
                <>{seminar.speaker.speaker}</>
              )}

              {seminar.speaker.affiliation && (
                <>&nbsp;- {seminar.speaker.affiliation}</>
              )}
            </span>
          </Typography>

          <Typography>
            <span className={classes.wrapIcon}>
              <SchoolOutlinedIcon className={classes.icon} />
              {seminar.seminar_group.url ? (
                <Link
                  target="_blank"
                  rel="noopener"
                  href={seminar.seminar_group.url}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                >
                  {seminar.seminar_group.name}
                </Link>
              ) : (
                <>{seminar.seminar_group.name}</>
              )}
            </span>
          </Typography>

          <Typography>
            <span className={classes.wrapIcon}>
              <LocationOnOutlinedIcon className={classes.icon} />
              {seminar.location.location}
            </span>
          </Typography>

          <div className={classes.seminarActions}>
            <SeminarActions
              seminar={seminar}
              keywords={keywords}
              currentlyDiscarded={currentlyDiscarded}
              currentRating={currentRating}
              seminarsUpdated={seminarsUpdated}
              setSeminarsUpdated={setSeminarsUpdated}
            />
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails className={classes.accordionDetails}>
        <Typography variant="body2" component="p">
          {parse(seminar.description)}
        </Typography>

        {keywords.length > 5 && (
          <ReactWordcloud words={keywords} options={options} />
        )}

        {seminar.registration_url && (
          <Typography>
            <b>Registration URL: </b>
            <Link
              target="_blank"
              rel="noopener"
              href={seminar.registration_url}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              {seminar.registration_url}
            </Link>
          </Typography>
        )}
      </AccordionDetails>
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
