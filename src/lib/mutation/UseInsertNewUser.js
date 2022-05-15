import { useMutation } from "@apollo/client";
import { INSERT_NEW_USER } from "../graphQL/Mutation";

export default function UseInsertNewUser() {
  const [InsertData, { data, error, loading }] = useMutation(INSERT_NEW_USER);
  return {
    InsertData,
    data,
    error,
    loading,
  };
}
