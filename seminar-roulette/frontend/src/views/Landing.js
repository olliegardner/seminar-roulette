import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

const Landing = () => {
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
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
    </Fragment>
  );
};

export default Landing;
