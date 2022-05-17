import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../Components/PrivateRoute/PrivateRoute";
import BlogDetail from "../BlogDetail/BlogDetail";
import CreateBlog from "./CreateBlog/CreateBlog";
import MainBlog from "./MainBlog/MainBlog";

function Blog() {
  return (
    <Switch>
      <Route path="/blog" exact component={MainBlog} />
      <PrivateRoute path="/blog/create-blog" exact component={CreateBlog} />
      <Route path="/blog/:id" exact component={BlogDetail} />
    </Switch>
  );
}

export default Blog;
