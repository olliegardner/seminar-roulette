import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import SeminarCard from "../../../components/SeminarCard";
import LoadingSpinner from "../../../components/LoadingSpinner";
import UserContext from "../../../context/UserContext";
import Filters from "./Filters";

const useStyles = makeStyles((theme) => ({
  pagination: {
    margin: theme.spacing(2, 0),
  },
}));

const TabSeminars = (props) => {
  const { label, request, notFoundText, showRatings } = props;

  const classes = useStyles();
  const user = useContext(UserContext);

  const notAuthenticated = user.guid == "None";

  const [seminars, setSeminars] = useState([]);
  const [seminarsUpdated, setSeminarsUpdated] = useState(0);
  const [similarities, setSimilarities] = useState({});
  const [ordering, setOrdering] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // filters
  const [time, setTime] = useState("all");
  const [online, setOnline] = useState(false);
  const [servesFood, setServesFood] = useState(false);
  const [showRated, setShowRated] = useState(false);
  const [showDiscarded, setShowDiscarded] = useState(false);

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    setLoaded(false);

    let pageRequest;

    if (request.includes(".json?")) pageRequest = `${request}&page=${page}`;
    else pageRequest = `${request}?page=${page}`;

    if (ordering != null) pageRequest += `&ordering=${ordering}`;
    if (time != "all") pageRequest += `&time=${time}`;
    if (online) pageRequest += `&online=${online}`;
    if (servesFood) pageRequest += `&serves_food=${servesFood}`;
    if (showRated) pageRequest += `&rated=${showRated.toString()}`;
    if (showDiscarded) pageRequest += `&discarded=${showDiscarded.toString()}`;

    axios
      .get(pageRequest)
      .then((res) => {
        setSeminars(res.data.results);
        setCount(res.data.count);
        setMaxPage(Math.ceil(res.data.count / 10));

        if (res.data.results == 0) setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [
    request,
    seminarsUpdated,
    page,
    ordering,
    time,
    online,
    servesFood,
    showRated,
    showDiscarded,
  ]);

  useEffect(() => {
    if (seminars.length > 0) {
      let seminarIDs = seminars.map((s) => (s.seminar ? s.seminar.id : s.id));

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
      {label != "random" && (
        <Grid container spacing={3} alignItems="center" justify="center">
          <Filters
            label={label}
            setOrdering={setOrdering}
            time={time}
            setTime={setTime}
            online={online}
            setOnline={setOnline}
            servesFood={servesFood}
            setServesFood={setServesFood}
            showRated={showRated}
            setShowRated={setShowRated}
            showDiscarded={showDiscarded}
            setShowDiscarded={setShowDiscarded}
          />
        </Grid>
      )}

      {loaded ? (
        <>
          {seminars.length > 0 ? (
            <>
              <Typography variant="overline">
                <b>{count}</b> {count == 1 ? "seminar" : "seminars"} found...
              </Typography>

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
                      currentlyDiscarded={
                        showRatings ? seminar.discarded : false
                      }
                      seminarsUpdated={seminarsUpdated}
                      setSeminarsUpdated={setSeminarsUpdated}
                      similarity={
                        notAuthenticated
                          ? 0
                          : similarities[
                              showRatings ? seminar.seminar.id : seminar.id
                            ]
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
  label: PropTypes.string,
  request: PropTypes.string,
  notFoundText: PropTypes.string,
  showRatings: PropTypes.bool,
};

export default TabSeminars;
