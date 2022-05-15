import { Button, Typography } from "@mui/material";
import React from "react";

export default function Brand({ username }) {
  return (
    <Typography
      variant="h5"
      color="black"
      fontWeight="600"
      fullWidth
      textAlign={"center"}
    >
      {username}
    </Typography>
  );
}
