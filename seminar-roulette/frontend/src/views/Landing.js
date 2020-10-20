import React, { Fragment, useEffect, useState } from "react";

const Landing = () => {
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  //   useEffect(() => {
  //     axios
  //       .get(`http://localhost:8000/api/current-user.json`, {
  //         headers: {
  //           Authorization: `JWT ${localStorage.getItem("token")}`,
  //         },
  //       })
  //       .then((res) => {
  //         setUser(res.data);
  //         setLoaded(true);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  return (
    <Fragment>
      <h1>Seminar Roulette</h1>

      {/* {loaded && <h4>Current user: {user.guid}</h4>} */}
    </Fragment>
  );
};

export default Landing;
