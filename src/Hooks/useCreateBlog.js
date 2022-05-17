import { useMutation } from '@apollo/client'
import { CreateBlog } from '../GraphQL/mutation'
import { GetBlogs, GetUserBlogs } from '../GraphQL/query'

export function useCreateBlog(uid) {
  const [createblog, {error: errorCreateBlog, loading: loadingCreateBlog}] = 
    useMutation(CreateBlog, {
      refetchQueries: [
        { query: GetBlogs},
        { query: GetUserBlogs, variables: { user_id: uid}}
      ]
    })
  return { createblog, errorCreateBlog, loadingCreateBlog };
}
