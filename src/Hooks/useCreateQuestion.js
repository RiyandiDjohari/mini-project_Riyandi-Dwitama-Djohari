import { useMutation } from "@apollo/client";
import { InsertNewQuestion } from "../GraphQL/mutation";
import { GetAllQuestion, GetUserQuestions } from "../GraphQL/query";


export function useCreateQuestion({ uid }) {
  const [createQuestion, {loading: loadingCreateQuestion, error: errorCreateQuestion}] = useMutation(InsertNewQuestion, {
    refetchQueries: [
      { query: GetAllQuestion },
      { query: GetUserQuestions, variables: { user_id: uid }}
    ]
  })
  return { createQuestion, loadingCreateQuestion, errorCreateQuestion };
}