import { Link, Typography } from "@mui/material";
import React from "react";

export default function Menu({ name, link }) {
  return (
    <Link
      href={link}
      underline="none"
      color={`${window.location.pathname == link ? "primary.main" : "black"}`}
    >
      <Typography variant="subtitle1">{name}</Typography>
    </Link>
  );
}
