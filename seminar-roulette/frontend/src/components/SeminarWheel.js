import React from "react";
import PropTypes from "prop-types";
import { Wheel } from "react-custom-roulette";

const data = [
  { option: "REACT" },
  { option: "CUSTOM" },
  { option: "ROULETTE" },
  { option: "WHEEL" },
  { option: "REACT" },
  { option: "CUSTOM" },
  { option: "ROULETTE" },
  { option: "WHEEL" },
];

const backgroundColors1 = ["#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"];
const backgroundColors2 = ["#D62828", "#F77F00", "#FCBF49", "#EAE2B7"];
const backgroundColors3 = ["#EF476F", "#FFD166", "#06D6A0", "#118AB2"];
const backgroundColors4 = ["#ffb997", "#f67e7d", "#843b62", "#621940"];

const textColors = ["#0b3351"];
const outerBorderColor = "#eeeeee";
const outerBorderWidth = 6;
const innerBorderColor = "#30261a";
const innerBorderWidth = 0;
const innerRadius = 0;
const radiusLineColor = "#eeeeee";
const radiusLineWidth = 4;
const fontSize = 16;
const textDistance = 60;

const SeminarWheel = (props) => {
  const { spin } = props;

  return (
    <Wheel
      mustStartSpinning={spin}
      // prizeNumber={3}
      // data={data}
      // backgroundColors={["#3e3e3e", "#df3428"]}
      // textColors={["#ffffff"]}
      // outerBorderWidth={2}
      // radiusLineWidth={2}
      prizeNumber={2}
      data={data}
      backgroundColors={backgroundColors4}
      textColors={textColors}
      fontSize={fontSize}
      outerBorderColor={outerBorderColor}
      outerBorderWidth={outerBorderWidth}
      innerRadius={innerRadius}
      innerBorderColor={innerBorderColor}
      innerBorderWidth={innerBorderWidth}
      radiusLineColor={radiusLineColor}
      radiusLineWidth={radiusLineWidth}
      // perpendicularText
      textDistance={textDistance}
      // perpendicularText={true}
      // onStopSpinning={() => (spin = false)}
    />
  );
};

export default SeminarWheel;

SeminarWheel.propTypes = {
  spin: PropTypes.bool,
};
