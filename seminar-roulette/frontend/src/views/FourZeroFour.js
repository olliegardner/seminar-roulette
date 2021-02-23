import React from "react";
import { Box, Button, Container, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SentimentDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentDissatisfiedOutlined";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    height: "100vh",
  },
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
  const theme = useTheme();

  return (
    <Container className={classes.container}>
      <Box className={classes.fourZeroFour}>
        <SentimentDissatisfiedOutlinedIcon className={classes.sadFace} />

        <Typography variant="h1" component="h1" color="textPrimary">
          404
        </Typography>

        <Box my={2}>
          <Typography variant="h5" color="textPrimary">
            Page not found
          </Typography>

          <Typography color="textSecondary">
            The page you are looking for doesn't exist.
          </Typography>
        </Box>

        <Box mt={2}>
          <Button
            variant="outlined"
            color={theme.palette.type == "light" ? "primary" : "secondary"}
            href={"/"}
          >
            Back to Seminar Roulette
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FourZeroFour;
