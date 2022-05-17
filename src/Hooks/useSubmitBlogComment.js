import { useMutation } from "@apollo/client";
import { SubmitBlogComment } from "../GraphQL/mutation";

export function useSubmitBlogComment() {
  const [submitComment, {error: errorSubmitComment, loading: loadingSubmitComment},] = useMutation(SubmitBlogComment);
  return { submitComment, errorSubmitComment, loadingSubmitComment};
}