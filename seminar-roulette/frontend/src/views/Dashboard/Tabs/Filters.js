import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import SortOutlinedIcon from "@material-ui/icons/SortOutlined";

const useStyles = makeStyles((theme) => ({
  sort: {
    justifyContent: "flex-end",
    marginRight: theme.spacing(1.5),
  },
  flexGrow: {
    flexGrow: 1,
  },
}));

const Filters = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.flexGrow} />

      <Button
        variant="contained"
        startIcon={<SortOutlinedIcon />}
        disableElevation
        className={classes.sort}
      >
        Sort by
      </Button>
    </>
  );
};

export default Filters;
