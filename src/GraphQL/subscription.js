import { gql } from "@apollo/client";

export const GetQuestionDetail = gql`
  subscription MySubscription($id: Int!) {
    question_by_pk(id: $id) {
      code
      id
      question
      title
      user_id
      username
      timestamp
      answers {
        answer
        id
        user_id
        code
        answer_comments {
          author
          comment
          id
          user_id
        }
      }
      tags {
        tag
        id
      }
      question_comments {
        comment
        id
        user_id
        author
      }
    }
  }
`
export const SubscribeBlogComments = gql`
  subscription MySubscription($id: Int!) {
    blog_comments(where: {blog_id: {_eq: $id}}) {
      author
      comment
      id
      user_id
    }
  }
`;