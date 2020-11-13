import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Redirect, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import LoadingSpinner from "../components/LoadingSpinner";

const Seminar = () => {
  const { seminarId } = useParams();

  const [seminar, setSeminar] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/seminar.json?id=${seminarId}`)
      .then((res) => {
        setSeminar(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        if (err.response.status == 404) setNotFound(true);
      });
  }, []);

  return notFound ? (
    <Redirect to="/404" />
  ) : loaded ? (
    <Fragment>
      <Typography>Seminar Page</Typography>
      <Typography>{seminar.title}</Typography>
    </Fragment>
  ) : (
    <LoadingSpinner />
  );
};

Seminar.propTypes = {};

export default Seminar;
