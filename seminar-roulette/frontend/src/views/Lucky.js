import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const Lucky = () => {
  const [seminar, setSeminar] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`api/seminars/random.json`)
      .then((res) => {
        setSeminar(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      <h1>Seminar Roulette</h1>

      {loaded && (
        <Fragment>
          <h3>Random seminar</h3>
          <p>Title: {seminar.title}</p>
          <p>Description: {seminar.description}</p>
          <p>
            Start time:{" "}
            {moment(seminar.start_time).format("Do MMMM YYYY, h:mm a")}
          </p>
          <p>
            End time: {moment(seminar.end_time).format("Do MMMM YYYY, h:mm a")}
          </p>
          <p>Speaker: {seminar.speaker.speaker}</p>
          <p>Location: {seminar.location.location}</p>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Lucky;
