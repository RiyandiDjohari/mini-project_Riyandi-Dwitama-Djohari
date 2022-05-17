import { useMutation } from "@apollo/client";
import { insertAnswerWithQuestionId } from "../GraphQL/mutation";

export function useSubmitAnswer(id) {
  const [submitAnswer, {loading: loadingSubmitAnswer, error: errorSubmitAnswer}] = useMutation(insertAnswerWithQuestionId)
  return { submitAnswer, loadingSubmitAnswer, errorSubmitAnswer};
}