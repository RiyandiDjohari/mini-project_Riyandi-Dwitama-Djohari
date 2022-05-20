import { useSubscription } from "@apollo/client";
import { GetUserQuestions } from "../GraphQL/subscription";

export function useSubscribeUserQuestions(uid) {
  const {
    data: myQuestions,
    loading: loadingMyQuestions,
    error: errorMyQuestions,
    refetch: refetchMyQuestions,
  } = useSubscription(GetUserQuestions, {
    variables: {
      user_id: uid
    },
  });
  return { myQuestions, loadingMyQuestions, errorMyQuestions, refetchMyQuestions};
}