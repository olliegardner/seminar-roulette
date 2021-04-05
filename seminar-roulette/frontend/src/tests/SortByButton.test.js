import React from "react";
import { mount } from "enzyme";
import SortByButton from "../components/SortByButton";
import { MenuItem } from "@material-ui/core";

describe("Test SortByButton component", () => {
  const wrapper = mount(<SortByButton />);

  it("loads menu items", () => {
    expect(wrapper.contains(<MenuItem />)).toBeDefined();
  });

  it("loads sort by button", () => {
    const button = wrapper.find(".MuiButton-label");
    expect(button.text()).toEqual("Sort by");
  });
});
