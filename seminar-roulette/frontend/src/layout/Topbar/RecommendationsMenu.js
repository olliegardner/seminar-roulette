import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Badge, IconButton, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

import UserContext from "../../context/UserContext";

const RecommendationsMenu = () => {
  const user = useContext(UserContext);

  const [recommendationCount, setRecommendationCount] = useState(0);

  useEffect(() => {
    axios
      .get(`api/user/recommendations.json?guid=${user.guid}`)
      .then((res) => {
        setRecommendationCount(res.data.length);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Tooltip title="Recommendations">
      <IconButton color="inherit" component={Link} to="/recommendations">
        <Badge badgeContent={recommendationCount} color="secondary">
          <FavoriteBorderOutlinedIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default RecommendationsMenu;
