import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Chip, Grid, Typography } from "@material-ui/core";

import SeminarCard from "./../components/SeminarCard";
import LoadingSpinner from "./../components/LoadingSpinner";

const Search = () => {
  const { search } = useParams();

  const [seminars, setSeminars] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/search/?q=${search}`)
      .then((res) => {
        setSeminars(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [search]);

  return (
    <>
      {loaded ? (
        <>
          <Typography variant="h5">
            Search Results{" "}
            <Chip label={seminars.length} size="small" color="secondary" />
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            You searched for: {search}
          </Typography>

          <Box mt={2}>
            {seminars.length > 0 ? (
              <Grid container spacing={3}>
                {seminars.map((seminar) => (
                  <Grid item key={seminar.id} xs={12} sm={6} md={4}>
                    <SeminarCard seminar={seminar} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No seminars found.</Typography>
            )}
          </Box>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

Search.propTypes = {};

export default Search;
