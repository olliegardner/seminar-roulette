import React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";

import TabSeminars from "../views/Dashboard/Tabs/TabSeminars";

const Search = () => {
  const { search } = useParams();

  return (
    <>
      <Typography variant="h5" color="textPrimary">
        Search Results
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        You searched for: {search}
      </Typography>

      <TabSeminars
        label="search"
        request={`api/search.json?q=${search}`}
        notFoundText="No seminars found."
        showRatingDiscardedOptions={false}
      />
    </>
  );
};

Search.propTypes = {};

export default Search;
