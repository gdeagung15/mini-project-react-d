import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_TEMA } from "../graphQL/Query";

export default function UseGetMapelTemaDetail(id, idU) {
  const { loading, error, data } = useQuery(GET_TEMA, {
    variables: { id: id },
  });
  return {
    loading,
    error,
    data,
  };
}
