import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

function PrivateRoute({ component: Component, ...rest }) {
  // get auth of user from redux
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

export default PrivateRoute;
