import React from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_MAPEL_ALL } from "../graphQL/Query";

export default function UseGetAllMapel() {
  const { loading, error, data } = useQuery(GET_MAPEL_ALL);
  return {
    loading,
    error,
    data,
  };
}
