import React, { useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import { IconButton, Tooltip } from "@material-ui/core";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";

const ToggleTheme = (props) => {
  const { themeType, setThemeType } = props;

  const csrftoken = Cookies.get("csrftoken");

  useEffect(() => {
    axios
      .put(
        `/api/user/theme.json`,
        {
          theme: themeType,
        },
        { headers: { "X-CSRFToken": csrftoken } }
      )
      .catch((err) => console.log(err));
  }, [themeType]);

  return (
    <Tooltip title="Toggle light/dark theme" placement="bottom">
      <IconButton
        aria-label="toggle theme"
        color="inherit"
        onClick={(e) => setThemeType(themeType == "light" ? "dark" : "light")}
      >
        {themeType == "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

ToggleTheme.propTypes = {
  children: PropTypes.node,
  themeType: PropTypes.string,
  setThemeType: PropTypes.func,
};

export default ToggleTheme;
