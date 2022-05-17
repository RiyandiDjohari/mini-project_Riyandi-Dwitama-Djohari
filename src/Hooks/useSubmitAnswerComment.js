import { useMutation } from "@apollo/client"
import { InsertNewAnswerComment } from "../GraphQL/mutation"

export function useSubmitAnswerComment(){
  const [submitComment, {loading: loadingSubmitComment, error: errorSubmitComment}] = useMutation(InsertNewAnswerComment)
  return{ submitComment, loadingSubmitComment, errorSubmitComment}
}