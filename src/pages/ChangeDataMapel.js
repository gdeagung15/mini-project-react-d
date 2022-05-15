import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UseGetAllMapel from "../lib/hook/UseGetAllMapel";
import EditSharpIcon from "@mui/icons-material/EditSharp";

export default function ChangeDataMapel() {
  const { data } = UseGetAllMapel();
  console.log(data);

  return (
    <Box display="flex" className="wrapper">
      <Sidebar />
      <Box
        style={{ backgroundColor: "#f7f7f8", overflow: "hidden" }}
        minHeight={"100vh"}
        width={"100%"}
      >
        <Box style={{ padding: "32px" }}>
          <Typography variant="h5">Ubah Mapel</Typography>
          <Box bgcolor={"white"} style={{ padding: "16px", marginTop: "32px" }}>
            <TableContainer>
              <Table
                sx={{
                  minWidth: "700px",
                  overflow: "scroll",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "primary.main" }}>
                      Nama Mapel
                    </TableCell>
                    <TableCell sx={{ color: "primary.main" }} align="right">
                      Edit
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.e_raport_mapel.map((item, key) => (
                    <TableRow
                      key={key}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell align="right">
                        <Link to={"/ubah-data-mapel/" + item.id}>
                          <Tooltip title="Edit">
                            <IconButton>
                              <EditSharpIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
