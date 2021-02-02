import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Chip, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import UserContext from "../context/UserContext";

const UserInterests = () => {
  const user = useContext(UserContext);

  const interests = user.interests;
  const csrftoken = Cookies.get("csrftoken");

  const [interestSuggestions, setInterestSuggestions] = useState([]);
  const [newInterests, setNewInterests] = useState(interests);
  const [disableInput, setDisableInput] = useState(newInterests.length >= 5);

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
    <div id="user-interests">
      <Autocomplete
        disabled={disableInput}
        multiple
        options={interestSuggestions}
        defaultValue={interests}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              disabled={false}
            />
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
        onChange={(e, newValue) => {
          setNewInterests(newValue);
          setDisableInput(newValue.length >= 5);
        }}
      />
    </div>
  );
};

export default UserInterests;
