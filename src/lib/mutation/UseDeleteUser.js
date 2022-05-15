import { useMutation } from "@apollo/client";
import { DELETE_USER, UPDATE_DATA_STUDENT } from "../graphQL/Mutation";

export default function UseDeleteUser() {
  const [DeleteUser, { data, error }] = useMutation(DELETE_USER);
  return {
    DeleteUser,
    data,
    error,
  };
}
