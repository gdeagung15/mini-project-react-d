import React from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_NILAI_SIKAP } from "../graphQL/Query";

export default function UseGetNilaiSikap(id) {
  const { loading, error, data } = useQuery(GET_NILAI_SIKAP, {
    variables: {
      _eq: id,
    },
  });
  return {
    loading,
    error,
    data,
  };
}
