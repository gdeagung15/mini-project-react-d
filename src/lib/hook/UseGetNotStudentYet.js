import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_NON_STUDENT } from "../graphQL/Query";

export default function UseGetNotStudentYet() {
  const { loading, error, data } = useQuery(GET_ALL_NON_STUDENT);
  return {
    loading,
    error,
    data,
  };
}
