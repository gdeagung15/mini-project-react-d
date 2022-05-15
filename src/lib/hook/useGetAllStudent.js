import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ALL_STUDENT } from "../graphQL/Query";

export default function UseGetAllStudent() {
  const [getData, { loading, error, data }] = useLazyQuery(GET_ALL_STUDENT);
  return {
    getData,
    loading,
    error,
    data,
  };
}
