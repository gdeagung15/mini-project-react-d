import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ALL_USER } from "../graphQL/Query";

export default function UseGetAllUser() {
  const [getUser, { loading, error, data }] = useLazyQuery(GET_ALL_USER);
  return {
    getUser,
    loading,
    error,
    data,
  };
}
