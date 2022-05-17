import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function PublicRoute({ path, component }) {
  const isLogin = useSelector((state) => state.user.isLogin);
  if (isLogin) {
    return <Redirect to="/forum" />;
  }
  return <Route path={path} component={component} />;
}

export default PublicRoute;
