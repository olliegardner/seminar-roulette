import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Chip, makeStyles, Paper, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import UserContext from "../context/UserContext";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     // justifyContent: "center",
//     flexWrap: "wrap",
//     listStyle: "none",
//     padding: theme.spacing(0.5),
//     margin: 0,
//   },
//   chip: {
//     margin: theme.spacing(0.5),
//   },
// }));

const UserInterests = () => {
  // const classes = useStyles();
  const user = useContext(UserContext);

  const interests = user.interests;
  const csrftoken = Cookies.get("csrftoken");

  const [interestSuggestions, setInterestSuggestions] = useState([]);
  const [newInterests, setNewInterests] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/user/interests.json`)
      .then((res) => setInterestSuggestions(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .put(
        `/api/user/interests/amend.json`,
        {
          interests: newInterests,
        },
        { headers: { "X-CSRFToken": csrftoken } }
      )
      .catch((err) => console.log(err));
  }, [newInterests]);

  return (
    <Autocomplete
      multiple
      id="user-interests"
      // limitTags={5}
      options={interestSuggestions}
      defaultValue={interests}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Your interests"
          placeholder="Your interests"
        />
      )}
      onChange={(e, newValue) => setNewInterests(newValue)}
    />
  );
};

export default UserInterests;
