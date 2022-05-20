import { useMutation } from "@apollo/client";
import { DeleteQuestion } from "../GraphQL/mutation";
import { GetAllQuestion } from "../GraphQL/query";


export function useDeleteQuestion() {
  const [ deleteQuestion, { loading: loadingDeleteQuestion, error: errorDeleteQuestion }] = useMutation(DeleteQuestion, {
    refetchQueries: [
      // { query: GetUserQuestions, variables: { user_id: uid }},
      { query: GetAllQuestion },
    ]
  });

  return { deleteQuestion, loadingDeleteQuestion, errorDeleteQuestion };
}