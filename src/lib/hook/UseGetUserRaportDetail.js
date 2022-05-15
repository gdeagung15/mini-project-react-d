import React from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_RAPORT_USER_DETAIL } from "../graphQL/Query";

export default function UseGetUserRaportDetail(id) {
  const { loading, error, data } = useQuery(GET_RAPORT_USER_DETAIL, {
    variables: { id: id },
  });
  return {
    loading,
    error,
    data,
  };
}
