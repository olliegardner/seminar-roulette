import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import UserContext from "../context/UserContext";

const Landing = () => {
  const user = useContext(UserContext);

  return (
    <Fragment>
      <h1>Seminar Roulette</h1>
      <p>Current user: {user.guid}</p>

      <Button component={Link} to="/lucky">
        Random Seminar
      </Button>
    </Fragment>
  );
};

export default Landing;
