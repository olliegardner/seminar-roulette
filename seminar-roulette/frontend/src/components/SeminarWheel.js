import React, { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Wheel } from "react-custom-roulette";
import { Backdrop, makeStyles } from "@material-ui/core";

import UserContext from "../context/UserContext";

const data = [
  { option: "" },
  { option: "" },
  { option: "" },
  { option: "" },
  { option: "" },
  { option: "" },
  { option: "" },
  { option: "" },
  { option: "" },
  { option: "" },
  { option: "" },
  { option: "" },
];

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const SeminarWheel = (props) => {
  const { spin, setSpin, time, food } = props;

  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);

  const randomNumber = Math.floor(Math.random * data.length);

  const handleStopSpinning = () => {
    setSpin(false);

    const timeQuery = time ? `?time=${time}` : "";
    const userQuery = user ? `&guid=${user.guid}` : "";
    const foodQuery = food ? "&food=true" : "";

    axios
      .get(`/api/seminars/random.json${timeQuery}${userQuery}${foodQuery}`)
      .then((res) => {
        if (res.data == "No seminar found") {
          history.push("/seminar/not-found");
        } else {
          history.push(`/seminar/${res.data.id}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Backdrop className={classes.backdrop} open={spin}>
      {spin && (
        <Wheel
          mustStartSpinning={spin}
          prizeNumber={randomNumber}
          data={data}
          backgroundColors={["#ffb997", "#f67e7d", "#843b62", "#621940"]}
          textColors={["#eeeeee"]}
          fontSize={16}
          outerBorderColor={"#eeeeee"}
          outerBorderWidth={4}
          innerRadius={1}
          innerBorderWidth={1}
          radiusLineColor={"#eeeeee"}
          radiusLineWidth={2}
          textDistance={60}
          onStopSpinning={() => handleStopSpinning()}
        />
      )}
    </Backdrop>
  );
};

export default SeminarWheel;

SeminarWheel.propTypes = {
  spin: PropTypes.bool,
  setSpin: PropTypes.func,
  time: PropTypes.string,
  food: PropTypes.bool,
};
