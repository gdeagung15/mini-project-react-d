import { useMutation } from "@apollo/client";
import { UPDATE_MAPEL_KD } from "../graphQL/Mutation";

export default function UseChangeMapelKD() {
  const [UpdateData, { data, error }] = useMutation(UPDATE_MAPEL_KD);
  return {
    UpdateData,
    data,
    error,
  };
}
