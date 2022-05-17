import { useSubscription } from "@apollo/client";
import { GetQuestionDetail } from "../GraphQL/subscription";

export function useSubscribeQuestionDetail(id) {
  const { 
    data: questionData, 
    loading: loadingQuestionData, 
    error: errorQuestionData
  } = useSubscription(GetQuestionDetail, {variables: { id }});
  
  return { questionData, loadingQuestionData, errorQuestionData }
}