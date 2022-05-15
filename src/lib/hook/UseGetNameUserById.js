import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_NAME_BY_ID_USER } from "../graphQL/Query";

export default function UseGetNameUserById(id) {
  const { loading, error, data } = useQuery(GET_NAME_BY_ID_USER, {
    variables: { id: id },
  });
  return {
    loading,
    error,
    data,
  };
}
