import { useMutation } from "@apollo/client";
import { INSERT_DATA_NEW_STUDENT } from "../graphQL/Mutation";

export default function UseInsertStudent() {
  const [InsertData, { data, error, loading }] = useMutation(
    INSERT_DATA_NEW_STUDENT
  );
  return {
    InsertData,
    data,
    error,
    loading,
  };
}
