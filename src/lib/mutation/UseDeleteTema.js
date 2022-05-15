import { useMutation } from "@apollo/client";
import { DELETE_TEMA } from "../graphQL/Mutation";

export default function UseDeleteTema() {
  const [DeleteTema, { data, error, loading }] = useMutation(DELETE_TEMA);
  return {
    DeleteTema,
    data,
    error,
    loading,
  };
}
