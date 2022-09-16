import React from "react";

import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  path,
  condition,
  redirectRoute,
  ...props
}) => {
  if (!condition) {
    return (
      <Redirect
        to={{
          pathname: redirectRoute,
          from: props.location,
        }}
      />
    );
  }

  return <Route component={Component} path={path} {...props} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  path: PropTypes.string,
  condition: PropTypes.bool,
  redirectRoute: PropTypes.string,
  location: PropTypes.object,
};
export default PrivateRoute;
