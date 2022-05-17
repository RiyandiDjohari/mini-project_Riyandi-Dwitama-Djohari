import { useLazyQuery } from "@apollo/client";
import { GetQuestionByTag } from "../GraphQL/query";

export function useGetQuestionByTag(tag) {
  const [
    getQuestionByTag, {
      data: questionByTag,
      error: errorQuestionByTag,
      loading: loadingQuestionByTag,
    }
  ] = useLazyQuery(GetQuestionByTag);
  return { getQuestionByTag, questionByTag, errorQuestionByTag, loadingQuestionByTag}
}