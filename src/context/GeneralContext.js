import React, { useEffect, useState, createContext } from "react";

import { useHistory } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const history = useHistory();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const [reload, setReload] = useState(1);
  //   const [username, setUsername] = useState("");
  //   const [role, setRole] = useState("");

  useEffect(() => {
    if (username === null || role === null) {
      // if (username === "" || role === "") {
      history.push("/login");
    }
  }, [reload]);

  const value = {
    username,
    role,
    // setUsername,
    // setRole,
    setReload,
    reload,
  };

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
