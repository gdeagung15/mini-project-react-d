import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_MAPEL_DETAILS } from "../graphQL/Query";

export default function UseGetMapelDetail(id, idU) {
  const { loading, error, data } = useQuery(GET_MAPEL_DETAILS, {
    variables: { id: id, idU: idU },
  });
  return {
    loading,
    error,
    data,
  };
}
