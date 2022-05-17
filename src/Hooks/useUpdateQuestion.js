import { useMutation } from "@apollo/client";
import { UpdateQuestion } from "../GraphQL/mutation";
import { GetAllQuestion, GetUserQuestions } from "../GraphQL/query";

export function useUpdateQuestion(uid) {
  const [ updateQuestion, {loading: loadingUpdateQuestion, error: errorUpdateQuestion}] = useMutation(UpdateQuestion, {
    refetchQueries: [
      { query: GetAllQuestion },
      { query: GetUserQuestions, variables: {user_id: uid}}
    ],
  });
  return { updateQuestion, loadingUpdateQuestion, errorUpdateQuestion }
}