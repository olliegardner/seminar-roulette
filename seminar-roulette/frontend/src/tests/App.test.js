import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import App from "../App";

it("Renders application without crashing", () => {
  const root = document.createElement("div");
  render(<App />, root);
  unmountComponentAtNode(root);
});
