import { useMutation } from "@apollo/client";
import { INSERT_DATA_NILAI_SIKAP } from "../graphQL/Mutation";

export default function UseInsertNilaiSikap() {
  const [InsertData, { data, error }] = useMutation(INSERT_DATA_NILAI_SIKAP);
  return {
    InsertData,
    data,
    error,
  };
}
