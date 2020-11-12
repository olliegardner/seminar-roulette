import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Badge, IconButton, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";

import UserContext from "../../context/UserContext";

const HistoryMenu = () => {
  const user = useContext(UserContext);

  const [historyCount, setHistoryCount] = useState(0);

  const getHistoryCount = () => {
    axios
      .get(`api/seminars/history.json?guid=${user.guid}`)
      .then((res) => {
        setHistoryCount(res.data.length);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getHistoryCount();
  }, []);

  useEffect(() => {
    // runs api call every 15 seconds
    const interval = setInterval(() => getHistoryCount(), 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Tooltip title="History">
      <IconButton color="inherit" component={Link} to="/history">
        <Badge badgeContent={historyCount} color="secondary">
          <RateReviewOutlinedIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default HistoryMenu;
