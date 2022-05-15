import { useMutation } from "@apollo/client";
import { DELETE_NILAI_USER } from "../graphQL/Mutation";

export default function UseDeleteNilaiUser() {
  const [DeleteUser, { data, error, loading }] = useMutation(DELETE_NILAI_USER);
  return {
    DeleteUser,
    data,
    error,
    loading,
  };
}
