import { useQuery } from "@apollo/client";
import { GetUserQuestions } from "../GraphQL/query";


export function useGetUserQuestion(uid) {
  const {
    data: myQuestions,
    loading: loadingMyQuestions,
    error: errorMyQuestions,
    refetch: refetchMyQuestions,
  } = useQuery(GetUserQuestions, {
    variables: {
      user_id: uid
    },
  });

  return { myQuestions, loadingMyQuestions, errorMyQuestions, refetchMyQuestions }
}