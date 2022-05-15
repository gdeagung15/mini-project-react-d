import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../graphQL/Mutation";

export default function UseEditUser() {
  const [EditData, { data, error1, loading1 }] = useMutation(UPDATE_USER);
  return {
    EditData,
    data,
    error1,
    loading1,
  };
}
