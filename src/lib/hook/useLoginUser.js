import React from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { LOGIN } from "../graphQL/Query";

export default function UseLoginUser() {
  const [loginUser, { loading, error, data }] = useLazyQuery(LOGIN);
  return {
    loginUser,
    loading,
    error,
    data,
  };
}
