import { useMutation } from "@apollo/client";
import { INSERT_DATA_NILAI_KDS_PENGETAHUAN } from "../graphQL/Mutation";

export default function UseInsertNilaiKdsPengetahuan() {
  const [InsertData, { data, error }] = useMutation(
    INSERT_DATA_NILAI_KDS_PENGETAHUAN
  );
  return {
    InsertData,
    data,
    error,
  };
}
