import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { InputBase, fade, makeStyles, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    borderWidth: 1,
    borderColor: fade(theme.palette.common.white, 0.15),
    borderStyle: "solid",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 2),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  const history = useHistory();

  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) {
      history.push(`/search/${search}`);
      setSearch("");
    }
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSearchSubmit}>
      <div className={classes.search}>
        <InputBase
          placeholder="Search seminars…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSearchSubmit}
        >
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
