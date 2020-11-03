import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  makeStyles,
  MenuItem,
  Typography,
  InputLabel,
  Select,
  FormControl,
  Paper,
} from "@material-ui/core";
import UserContext from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  seminarCard: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
  },
  whiteText: {
    color: theme.palette.common.white,
  },
}));

const HistoryCard = (props) => {
  const { seminar, historyUpdated, setHistoryUpdated } = props;

  const classes = useStyles();
  const user = useContext(UserContext);
  const csrftoken = Cookies.get("csrftoken");

  const [rating, setRating] = useState("");

  const setSeminarAttended = (seminarId, discarded) => {
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
    <Paper variant="outlined" className={classes.seminarCard}>
      <Box p={2} textAlign="center">
        <Typography variant="h6">{seminar.title}</Typography>

        <Typography>
          Did you attend this seminar? If so, what would you rate it?
        </Typography>
        <br />

        <FormControl variant="outlined">
          <InputLabel id="rating-label">Rating</InputLabel>
          <Select
            label="Rating"
            labelId="rating-label"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={() => setSeminarAttended(seminar.id, false)}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          onClick={() => setSeminarAttended(seminar.id, true)}
        >
          No
        </Button>
      </Box>
    </Paper>
  );
};

export default HistoryCard;

HistoryCard.propTypes = {
  seminar: PropTypes.object,
  historyUpdated: PropTypes.number,
  setHistoryUpdated: PropTypes.func,
};
