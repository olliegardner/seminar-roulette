import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Landing = () => {
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios;
    axios
      .get(`api/current-user.json`)
      .then((res) => {
        setUser(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      <h1>Seminar Roulette</h1>

      {loaded && <p>Current user: {user.guid}</p>}

      <Button component={Link} to="/lucky">
        Random Seminar
      </Button>
    </Fragment>
  );
};

export default Landing;
