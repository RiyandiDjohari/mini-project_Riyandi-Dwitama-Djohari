import { useMutation } from "@apollo/client";
import { DeleteQuestion } from "../GraphQL/mutation";
import { GetAllQuestion, GetUserQuestions } from "../GraphQL/query";


export function useDeleteQuestion(uid) {
  const [ deleteQuestion, { loading: loadingDeleteQuestion, error: errorDeleteQuestion }] = useMutation(DeleteQuestion, {
    refetchQueries: [
      { query: GetUserQuestions, variables: { user_id: uid }},
      { query: GetAllQuestion },
    ]
  });

  return { deleteQuestion, loadingDeleteQuestion, errorDeleteQuestion };
}