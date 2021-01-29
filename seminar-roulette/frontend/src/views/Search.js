import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import SeminarCard from "./../components/SeminarCard";
import LoadingSpinner from "./../components/LoadingSpinner";
import UserContext from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  pagination: {
    margin: theme.spacing(2, 0),
  },
}));

const Search = () => {
  const { search } = useParams();
  const classes = useStyles();
  const user = useContext(UserContext);

  const notAuthenticated = user.guid == "None";

  const [seminars, setSeminars] = useState([]);
  const [similarities, setSimilarities] = useState({});
  const [loaded, setLoaded] = useState(false);

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    axios
      .get(`/api/search/?q=${search}&page=${page}`)
      .then((res) => {
        setSeminars(res.data.results);
        setCount(res.data.count);
        setMaxPage(Math.ceil(res.data.count / 10));

        if (res.data.count == 0) setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [search, page]);

  useEffect(() => {
    if (seminars.length > 0) {
      let seminarIDs = seminars.map((s) => s.id);

      !notAuthenticated &&
        axios
          .get(
            `api/user/similarities.json?guid=${user.guid}&seminars=${seminarIDs}`
          )
          .then((res) => {
            setSimilarities(res.data);
            setLoaded(true);
          })
          .catch((err) => console.log(err));
    }
  }, [seminars]);

  return (
    <>
      {loaded ? (
        <>
          <Typography variant="h5">Search Results</Typography>
          <Typography color="textSecondary" gutterBottom>
            You searched for: {search}
          </Typography>

          <Box mt={2}>
            {seminars.length > 0 ? (
              <>
                <Typography variant="overline">
                  <b>{count}</b> {count == 1 ? "seminar" : "seminars"} found...
                </Typography>

                <Grid
                  container
                  spacing={3}
                  alignItems="center"
                  justify="center"
                >
                  {seminars.map((seminar) => (
                    <Grid item key={seminar.id} xs={12}>
                      <SeminarCard
                        seminar={seminar}
                        currentRating={null}
                        currentlyDiscarded={false}
                        // seminarsUpdated={seminarsUpdated}
                        // setSeminarsUpdated={setSeminarsUpdated}
                        similarity={
                          notAuthenticated ? 0 : similarities[seminar.id]
                        }
                      />
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
              </>
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
