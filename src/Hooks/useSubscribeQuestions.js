import { useSubscription } from "@apollo/client";
import { GetAllQuestion } from "../GraphQL/subscription";

export function useSubscribeQuestion() {
  const {data, loading, error} = useSubscription(GetAllQuestion);
  return { data, loading, error };
}