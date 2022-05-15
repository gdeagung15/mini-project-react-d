import React, { Component, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Sidebar from "../components/Sidebar";
import { GeneralContext } from "../context/GeneralContext";

export default function Welcome() {
  const username = localStorage.getItem("username");
  return (
    <Box display="flex" className="wrapper">
      <Sidebar />
      <Box
        sx={{ bgcolor: "info.main" }}
        width="100%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        color="white"
      >
        <Typography variant="h2" component="div" gutterBottom>
          Selamat Datang {username}
        </Typography>
        <Typography variant="h2" component="div" gutterBottom>
          Raport Online
        </Typography>
      </Box>
    </Box>
  );
}
