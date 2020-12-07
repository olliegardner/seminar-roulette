import React, { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";
import {
  Box,
  IconButton,
  makeStyles,
  Typography,
  FormControl,
  Paper,
  Link,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Rating from "@material-ui/lab/Rating";
import UserContext from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  historyCard: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
  },
  attendText: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const HistoryCard = (props) => {
  const { seminar, historyUpdated, setHistoryUpdated } = props;

  const classes = useStyles();
  const user = useContext(UserContext);
  const csrftoken = Cookies.get("csrftoken");

  const setSeminarAttended = (seminarId, discarded, rating) => {
    axios
      .put(
        `/api/seminars/history/attended.json?guid=${user.guid}`,
        { seminar: seminarId, rating: rating, discarded: discarded },
        {
          headers: {
            "X-CSRFToken": csrftoken,
          },
        }
      )
      .then(() => {
        setHistoryUpdated(historyUpdated + 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Paper variant="outlined" className={classes.historyCard}>
      <Box textAlign="right">
        <IconButton
          aria-label="clear"
          color="secondary"
          onClick={() => setSeminarAttended(seminar.id, true)}
        >
          <ClearIcon />
        </IconButton>
      </Box>

      <Box pb={2} px={2} textAlign="center">
        <Typography variant="h6" gutterBottom>
          <Link color="inherit" href={`/seminar/${seminar.id}`}>
            {seminar.title}
          </Link>
        </Typography>

        <Typography variant="subtitle2" gutterBottom>
          {moment(seminar.start_time).format("Do MMMM YYYY")}
        </Typography>

        <Typography className={classes.attendText}>
          Did you attend this seminar? If so, what would you rate it?
        </Typography>

        <FormControl variant="outlined">
          <Rating
            name={`rating-${seminar.id}`}
            defaultValue={0}
            precision={0.5}
            onChange={(e) =>
              setSeminarAttended(seminar.id, false, e.target.value)
            }
          />
        </FormControl>
      </Box>
    </Paper>
  );
};

HistoryCard.propTypes = {
  seminar: PropTypes.object,
  historyUpdated: PropTypes.number,
  setHistoryUpdated: PropTypes.func,
};

export default HistoryCard;
