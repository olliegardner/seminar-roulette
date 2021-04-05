import React from "react";
import { mount } from "enzyme";
import FourZeroFour from "../views/FourZeroFour";
import { Typography } from "@material-ui/core";

describe("Test FourZeroFour component", () => {
  const wrapper = mount(<FourZeroFour />);

  it("displays page not found test", () => {
    expect(
      wrapper.contains(
        <Typography variant="h5" color="textPrimary">
          Page not found
        </Typography>
      )
    ).toBeTruthy();
  });

  it("loads home button", () => {
    const button = wrapper.find(".MuiButton-label");
    expect(button.text()).toEqual("Back to Seminar Roulette");
  });
});
