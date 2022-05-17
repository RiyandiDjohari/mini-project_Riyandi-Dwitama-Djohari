import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ path, component }) {
  const isLogin = useSelector((state) => state.user.isLogin);
  if (!isLogin) {
    return <Redirect to="/login" />;
  }
  return <Route path={path} component={component} />;
}

export default PrivateRoute;
