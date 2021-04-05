import React from "react";
import { shallow } from "enzyme";
import SearchBar from "../layout/Topbar/SearchBar";
import SearchIcon from "@material-ui/icons/Search";

describe("Test SearchBar component", () => {
  const wrapper = shallow(<SearchBar />);

  it("displays search bar correctly", () => {
    expect(wrapper.find("#search")).toBeDefined();
  });

  it("renders search icon", () => {
    expect(wrapper.contains(<SearchIcon />)).toBeTruthy();
  });
});
