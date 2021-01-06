import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Chip, Grid, makeStyles, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import SeminarCard from "./../components/SeminarCard";
import LoadingSpinner from "./../components/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  pagination: {
    margin: theme.spacing(2, 0),
  },
}));

const Search = () => {
  const { search } = useParams();
  const classes = useStyles();

  const [seminars, setSeminars] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    axios
      .get(`/api/search/?q=${search}&page=${page}`)
      .then((res) => {
        setSeminars(res.data.results);
        setMaxPage(Math.ceil(res.data.count / 10));
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [search, page]);

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
              <Grid container spacing={3} alignItems="center" justify="center">
                {seminars.map((seminar) => (
                  <Grid item key={seminar.id} xs={12}>
                    <SeminarCard seminar={seminar} />
                  </Grid>
                ))}

                <Pagination
                  count={maxPage}
                  color="primary"
                  shape="rounded"
                  showFirstButton
                  showLastButton
                  className={classes.pagination}
                  page={page}
                  onChange={(e, newPage) => setPage(newPage)}
                />
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
