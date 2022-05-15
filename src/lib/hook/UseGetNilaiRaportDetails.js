import React from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_NILAI_USER_DETAIL } from "../graphQL/Query";

export default function UseGetNilaiRaportDetails(id) {
  const { loading, error, data } = useQuery(GET_NILAI_USER_DETAIL, {
    variables: { _eq: id },
  });
  return {
    loading,
    error,
    data,
  };
}
