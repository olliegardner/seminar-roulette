import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Badge,
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  MenuItem,
  Popover,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import UserContext from "../../context/UserContext";

const HistoryMenu = () => {
  const user = useContext(UserContext);

  const [historyCount, setHistoryCount] = useState(0);

  useEffect(() => {
    // runs api call every 30 seconds
    const interval = setInterval(() => {
      axios
        .get(`api/seminars/history.json?guid=${user.guid}`)
        .then((res) => {
          setHistoryCount(res.data.length);
        })
        .catch((err) => console.log(err));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Tooltip title="History">
      <IconButton color="inherit">
        <Badge badgeContent={historyCount} color="secondary">
          <HistoryOutlinedIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default HistoryMenu;
