import React, { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Typography, makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
  button: {
    textTransform: "none",
    letterSpacing: 0,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "center",
  },
  icon: {
    color: theme.palette.icon,
    display: "flex",
    justifyContent: "center",
  },
  column: {
    flexDirection: "column",
  },
}));

const CustomRouterLink = forwardRef((props, ref) => {
  const exact = props.to == "/";
  return (
    <div ref={ref}>
      <RouterLink {...props} exact={exact} />
    </div>
  );
});

const TopbarButton = (props) => {
  const { text, icon, href } = props;

  const classes = useStyles();

  return (
    <Box mx={1}>
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={CustomRouterLink}
        to={href}
      >
        <div className={classes.column}>
          <div className={classes.icon}>{icon}</div>
          <Typography variant="caption" component="span">
            {text}
          </Typography>
        </div>
      </Button>
    </Box>
  );
};

TopbarButton.propTypes = {};

export default TopbarButton;
