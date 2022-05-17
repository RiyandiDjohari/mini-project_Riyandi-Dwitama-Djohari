import React from "react";
import classes from "./BlogDetail.module.css";
import { Card } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GetBlogDetail } from "../../GraphQL/query";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSubmitBlogComment } from "../../Hooks/useSubmitBlogComment";
import { useSubscribeBlogComments } from "../../Hooks/useSubscribeBlogComments";
import Container from "../../Components/Container/Container";
import CommentForm from "../../Components/Comment/CommentForm";
import CommentList from "../../Components/Comment/CommentList";
import LoadingBlogDetail from "../../Components/Loading/LoadingBlogDetail";
import Tag from "../../Components/Tag/Tag";
import TagContainer from "../../Components/Tag/TagContainer";

function BlogDetail() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const { submitComment, errorSubmitComment, loadingSubmitComment } = useSubmitBlogComment(); 
  const { data, error, loading } = useQuery(GetBlogDetail, {
    variables: {
      id: id,
    },
  });
  const { blogComments, errorBlogComments, loadingBlogComments } = useSubscribeBlogComments(id);
  const submitCommentHandler = (comment) => {
    submitComment({
      variables: {
        object: {
          author: user.username,
          user_id: user.uid,
          comment: comment,
          blog_id: id,
        },
      },
    });
  };

  if(error) alert(error.message);
  console.log(blogComments);
  
  return (
    <Container>
      <Card className={classes.card}>
        {loading && <LoadingBlogDetail />}
        {!loading && (
          <div>
            <h1>{data.blogs_by_pk.title}</h1>
            <p>Created by {data.blogs_by_pk.author}</p>
            <TagContainer>
              {data.blogs_by_pk.blog_tags.map((tag) => {
                return <Tag key={tag.id} removeable={false} text={tag.tag}/>
              })}
            </TagContainer>
            <div className={classes.line}></div>
            <div
              dangerouslySetInnerHTML={{__html: data.blogs_by_pk.content}}
            ></div>
          </div>
        )}
      </Card>
      {!loadingBlogComments && (
        <Card className={classes.card}>
          <CommentList 
            error={errorBlogComments}
            comments={blogComments.blog_comments}
          />
          {user.isLogin && (
            <CommentForm 
              error={errorSubmitComment}
              loading={loadingSubmitComment}
              onSubmit={submitCommentHandler}
            />
          )}
        </Card>
      )}
    </Container>
  );
}

export default BlogDetail;
