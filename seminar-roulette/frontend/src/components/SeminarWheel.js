import React, { useContext } from "react";
import PropTypes from "prop-types";
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
          onStopSpinning={() => {
            setSpin(false);

            const foodQuery = food ? "&food=true" : "";

            history.push(`/lucky/?time=${time}&guid=${user.guid}${foodQuery}`);
          }}
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
