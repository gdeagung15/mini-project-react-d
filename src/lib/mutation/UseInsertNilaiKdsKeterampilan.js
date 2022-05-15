import { useMutation } from "@apollo/client";
import { INSERT_DATA_NILAI_KDS_KETERAMPILAN } from "../graphQL/Mutation";

export default function UseInsertNilaiKdsKeterampilan() {
  const [InsertData, { data, error }] = useMutation(
    INSERT_DATA_NILAI_KDS_KETERAMPILAN
  );
  return {
    InsertData,
    data,
    error,
  };
}
