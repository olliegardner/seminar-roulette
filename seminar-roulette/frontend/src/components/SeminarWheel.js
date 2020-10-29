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
  const { spin } = props;
  const history = useHistory();

  return (
    <Wheel
      mustStartSpinning={spin}
      prizeNumber={2}
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
        history.push("/lucky");
      }}
    />
  );
};

export default SeminarWheel;

SeminarWheel.propTypes = {
  spin: PropTypes.bool,
};
