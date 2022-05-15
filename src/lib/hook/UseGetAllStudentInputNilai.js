import React from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_NILAI_INPUT } from "../graphQL/Query";

export default function UseGetAllStudentInputNilai() {
  const { loading, error, data } = useQuery(GET_NILAI_INPUT);
  return {
    loading,
    error,
    data,
  };
}
