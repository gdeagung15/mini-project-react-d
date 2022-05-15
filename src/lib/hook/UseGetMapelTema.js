import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_MAPEL_TEMA } from "../graphQL/Query";

export default function UseGetMapelTema(id, idU) {
  const [getData, { loading, error, data }] = useLazyQuery(GET_MAPEL_TEMA, {
    variables: { id: id },
  });
  return {
    loading,
    error,
    data,
    getData,
  };
}
