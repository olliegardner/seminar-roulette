import React from "react";
import { Box, Button, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SentimentDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentDissatisfiedOutlined";

const useStyles = makeStyles((theme) => ({
  fourZeroFour: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "90vh",
    alignItems: "center",
  },
  sadFace: {
    fontSize: "180px",
    color: theme.palette.primary.main,
  },
}));

const FourZeroFour = () => {
  const classes = useStyles();

  return (
    <Container>
      <Box className={classes.fourZeroFour}>
        <SentimentDissatisfiedOutlinedIcon className={classes.sadFace} />
        <Typography color="primary" variant="h1" component="h1">
          404
        </Typography>
        <Box my={2}>
          <Typography variant="h5">Page not found</Typography>
          <Typography>The page you are looking for doesn't exist.</Typography>
        </Box>
        <Box mt={2}>
          <Button variant="outlined" color="primary" href={"/"}>
            Back to Seminar Roulette
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FourZeroFour;
