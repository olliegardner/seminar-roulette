import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Wheel } from "react-custom-roulette";

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

const SeminarWheel = (props) => {
  const { spin, time } = props;
  const history = useHistory();

  const randomNumber = Math.floor(Math.random * data.length);

  return (
    <Wheel
      mustStartSpinning={spin}
      prizeNumber={randomNumber}
      data={data}
      backgroundColors={["#ffb997", "#f67e7d", "#843b62", "#621940"]}
      textColors={["#eeeeee"]}
      fontSize={16}
      outerBorderColor={"#eeeeee"}
      outerBorderWidth={4}
      innerRadius={0}
      innerBorderWidth={0}
      radiusLineColor={"#eeeeee"}
      radiusLineWidth={2}
      textDistance={60}
      onStopSpinning={() => {
        history.push(`/lucky/?time=${time}`);
      }}
    />
  );
};

export default SeminarWheel;

SeminarWheel.propTypes = {
  spin: PropTypes.bool,
  time: PropTypes.string,
};
