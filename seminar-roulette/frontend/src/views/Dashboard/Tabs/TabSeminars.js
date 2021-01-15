import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import SeminarCard from "../../../components/SeminarCard";
import LoadingSpinner from "../../../components/LoadingSpinner";
import UserContext from "../../../context/UserContext";

const useStyles = makeStyles((theme) => ({
  pagination: {
    margin: theme.spacing(2, 0),
  },
}));

const TabSeminars = (props) => {
  const { request, notFoundText, showRatings, showPagination } = props;

  const classes = useStyles();
  const user = useContext(UserContext);

  const [seminars, setSeminars] = useState([]);
  const [seminarsUpdated, setSeminarsUpdated] = useState(0);
  const [similarities, setSimilarities] = useState({});
  const [loaded, setLoaded] = useState(false);

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    let pageRequest;

    if (request.includes(".json?")) {
      pageRequest = `${request}&page=${page}`;
    } else {
      pageRequest = `${request}?page=${page}`;
    }

    axios
      .all([
        axios.get(pageRequest),
        axios.get(`api/user/similarities/?guid=${user.guid}`),
      ])
      .then(
        axios.spread((...res) => {
          setSeminars(res[0].data.results);
          setMaxPage(Math.ceil(res[0].data.count / 10));
          setSimilarities(res[1].data);
          setLoaded(true);
        })
      )
      .catch((err) => console.log(err));
  }, [request, seminarsUpdated, page]);

  return (
    <>
      {loaded ? (
        <>
          {seminars.length > 0 ? (
            <Grid container spacing={3} alignItems="center" justify="center">
              {seminars.map((seminar) => (
                <Grid
                  item
                  key={showRatings ? seminar.seminar.id : seminar.id}
                  xs={12}
                >
                  <SeminarCard
                    seminar={showRatings ? seminar.seminar : seminar}
                    currentRating={showRatings ? seminar.rating : null}
                    currentlyDiscarded={showRatings ? seminar.discarded : false}
                    seminarsUpdated={seminarsUpdated}
                    setSeminarsUpdated={setSeminarsUpdated}
                    similarity={
                      similarities[
                        showRatings ? seminar.seminar.id : seminar.id
                      ]
                    }
                  />
                </Grid>
              ))}

              {showPagination && (
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
              )}
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
