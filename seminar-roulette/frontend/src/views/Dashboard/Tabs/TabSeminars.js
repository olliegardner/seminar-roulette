import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import SeminarCard from "../../../components/SeminarCard";
import LoadingSpinner from "../../../components/LoadingSpinner";

const TabSeminars = (props) => {
  const { request, notFoundText, showRatings } = props;

  const [seminars, setSeminars] = useState([]);
  const [seminarsUpdated, setSeminarsUpdated] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(request)
      .then((res) => {
        setSeminars(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [request, seminarsUpdated]);

  return (
    <>
      {loaded ? (
        <>
          {seminars.length > 0 ? (
            <Grid container spacing={3}>
              {seminars.map((seminar) => (
                <Grid
                  item
                  key={showRatings ? seminar.seminar.id : seminar.id}
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <SeminarCard
                    seminar={showRatings ? seminar.seminar : seminar}
                    currentRating={showRatings ? seminar.rating : null}
                    currentlyDiscarded={showRatings ? seminar.discarded : false}
                    seminarsUpdated={seminarsUpdated}
                    setSeminarsUpdated={setSeminarsUpdated}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>{notFoundText}</Typography>
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

TabSeminars.propTypes = {
  request: PropTypes.string,
  notFoundText: PropTypes.string,
  showRatings: PropTypes.bool,
};

export default TabSeminars;
