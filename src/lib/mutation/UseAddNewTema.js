import { useMutation } from "@apollo/client";
import { INSERT_ONE_TEMA } from "../graphQL/Mutation";

export default function UseAddNewTema() {
  const [InsertData, { data, error }] = useMutation(INSERT_ONE_TEMA);
  return {
    InsertData,
    data,
    error,
  };
}
