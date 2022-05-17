import { useMutation } from "@apollo/client";
import { DeleteUserBlog } from "../GraphQL/mutation";
import { GetBlogs, GetUserBlogs } from "../GraphQL/query";


export function useDeleteUserBlog(uid) {
  const [deleteBlog, {loading: loadingDeleteBlog, error: errorDeleteBlog }] =
    useMutation(DeleteUserBlog, {
      refetchQueries: [
        {query: GetBlogs},
        {query: GetUserBlogs, variables: {user_id: uid}},
      ],
    })
  return { deleteBlog, loadingDeleteBlog, errorDeleteBlog };
}