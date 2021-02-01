import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

const RouteWithLayout = (props) => {
  const {
    layout: Layout,
    component: Component,
    themeType,
    setThemeType,
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout themeType={themeType} setThemeType={setThemeType}>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  themeType: PropTypes.string,
  setThemeType: PropTypes.func,
  path: PropTypes.string,
};

export default RouteWithLayout;
