import { useMutation } from "@apollo/client";
import { InsertNewQuestionComment } from "../GraphQL/mutation";

export function useSubmitQuestionComment() {
  const [submitComment, {loading: loadingSubmitComment, error: errorSubmitComment}] = useMutation(InsertNewQuestionComment)
  return { submitComment, loadingSubmitComment, errorSubmitComment }
}