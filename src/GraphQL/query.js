import { gql } from "@apollo/client";

export const GetAllQuestion = gql`
  query MyQuery {
    question {
      id
      user_id
      question
      title
      username
      timestamp
      tags {
        id
        tag
      }
      answers {
        id
      }
    }
  }
`;

export const GetQuestionByTag = gql`
  query MyQuery($tag: String!) {
    question(where: {tags: {tag: {_eq: $tag}}}) {
      id
      user_id
      question
      title
      username
      timestamp
      code
      tags {
        id
        tag
      }
      answers {
        id
      }
    }
  }
`

export const GetBlogs = gql`
  query MyQuery {
    blogs {
      id
      image
      title
      user_id
      author
      blog_tags {
        id
        tag
      }
    }
  }
`;

export const GetUserBlogs = gql`
  query MyQuery($user_id: String!) {
    blogs(where: { user_id: { _eq: $user_id} }) {
      id
      image
      title
      user_id
      author
      blog_tags {
        id
        tag
      }
    }
  }
`;

export const GetBlogDetail = gql`
  query MyQuery($id: Int!) {
    blogs_by_pk(id: $id) {
      author
      content
      id
      image
      title
      user_id
      blog_tags {
        id
        tag
      }
    }
  }
`;

export const GetUserQuestions = gql`
  query MyQuery($user_id: String!) {
    question(where: {user_id: {_eq: $user_id}}) {
      id
      question
      code
      title
      user_id
      username
      tags {
        id
        tag
        question_id
      }
    }
  }
`;