import { useMutation } from "@apollo/client";
import { InsertNewQuestion } from "../GraphQL/mutation";
import { GetAllQuestion } from "../GraphQL/query";


export function useCreateQuestion() {
  const [createQuestion, {loading: loadingCreateQuestion, error: errorCreateQuestion}] = useMutation(InsertNewQuestion, {
    refetchQueries: [
      { query: GetAllQuestion },
    ]
  })
  return { createQuestion, loadingCreateQuestion, errorCreateQuestion };
}