import React from "react";
import { shallow } from "enzyme";
import ToggleTheme from "../layout/Topbar/ToggleTheme";
import Brightness4OutlinedIcon from "@material-ui/icons/Brightness4Outlined";

describe("Test ToggleTheme component", () => {
  it("renders light theme icon icon", () => {
    const wrapper = shallow(<ToggleTheme />);
    expect(
      wrapper.contains(<Brightness4OutlinedIcon id="theme" />)
    ).toBeTruthy();
  });
});
