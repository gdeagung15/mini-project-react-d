import { useMutation } from "@apollo/client";
import { UPDATE_DATA_STUDENT } from "../graphQL/Mutation";

export default function UseUpdateStudent() {
  const [UpdateData, { data, error, loading }] =
    useMutation(UPDATE_DATA_STUDENT);
  return {
    UpdateData,
    data,
    error,
    loading,
  };
}
