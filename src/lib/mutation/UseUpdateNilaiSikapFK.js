import { useMutation } from "@apollo/client";
import { UPDATE_NILAI_SIKAP_FK } from "../graphQL/Mutation";

export default function UseUpdateNilaiSikapFK() {
  const [UpdateData, { data, error }] = useMutation(UPDATE_NILAI_SIKAP_FK);
  return {
    UpdateData,
    data,
    error,
  };
}
