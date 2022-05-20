import { useQuery } from '@apollo/client';
import React from 'react'
import { useSelector } from 'react-redux'
import Container from '../../Components/Container/Container';
import { GetUserBlogs } from '../../GraphQL/query';
import BlogsContainer from '../Blog/MainBlog/BlogsContainer';
import "bootstrap/dist/css/bootstrap.min.css";

function BlogList() {
  const uid = useSelector((state) => state.user.uid);
  const {data, loading, error} = useQuery(GetUserBlogs, {
    variables: {
      user_id: uid,
    }
  });

  return (
    <Container>
      <h2 className="my-3 fw-normal" style={{fontFamily: "Lora"}}>Your Blogs</h2>
      <BlogsContainer del={true} data={data} loading={loading} error={error} />
    </Container>
  )
}

export default BlogList