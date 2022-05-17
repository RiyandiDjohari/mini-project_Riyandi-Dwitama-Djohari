import React from "react";
import { LibraryBooks } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { GetBlogs } from "../../../GraphQL/query";
import { useHistory } from "react-router-dom";
import classes from "./MainBlog.module.css";
import Button from "../../../Components/Button/Button";
import BlogsContainer from "./BlogsContainer";
import Container from "../../../Components/Container/Container";

function MainBlog() {
  const history = useHistory();
  const { data, error, loading } = useQuery(GetBlogs);
  
  const clickHandler = () => {
    history.push("/blog/create-blog");
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.jumbotronTitles}>
          <span className={classes.jumbotronTitle}>Blogs</span>
        </div>
        <img className={classes.jumbotronImg} src="https://images.unsplash.com/photo-1547093349-65cdba98369a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="headerImg" />
      </div>
      <Container>
        <div className={classes.flex}>
          <div className={classes.left}>
            <h2>Blogs</h2>
          </div>
          <div className={classes.right}>
            <Button className={classes.btn} theme="light" onClick={clickHandler}>
              <LibraryBooks />
              Create Blog
            </Button>
          </div>
        </div>
        <BlogsContainer data={data} error={error} loading={loading} />
      </Container>
    </>
  );
}

export default MainBlog;
