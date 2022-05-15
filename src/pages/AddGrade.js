import { Box, Button, Container, IconButton, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Sidebar from "../components/Sidebar";
import React, { Component } from "react";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import UseGetAllStudentInputNilai from "../lib/hook/UseGetAllStudentInputNilai";

export default function AddGrade() {
  const { data } = UseGetAllStudentInputNilai();
  return (
    <Box display="flex" className="wrapper">
      <Sidebar />
      <Box
        style={{ backgroundColor: "#f7f7f8", overflow: "hidden" }}
        minHeight={"100vh"}
        width={"100%"}
      >
        <Box style={{ padding: "32px" }}>
          <Typography variant="h5">Masukan Nilai</Typography>
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
                    <TableCell sx={{ color: "primary.main" }}>Nama</TableCell>
                    <TableCell sx={{ color: "primary.main" }} align="center">
                      Sikap Sosial
                    </TableCell>
                    <TableCell sx={{ color: "primary.main" }} align="center">
                      Sikap Spiritual
                    </TableCell>
                    <TableCell sx={{ color: "primary.main" }} align="center">
                      Nilai Pengetahuan
                    </TableCell>
                    <TableCell sx={{ color: "primary.main" }} align="center">
                      Nilai Keterampilan
                    </TableCell>
                    <TableCell sx={{ color: "primary.main" }} align="right">
                      Edit
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.e_raport_nilai.map((item, key) => (
                    <TableRow
                      key={key}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {item.user.name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {item.nilai_sosial === null ? (
                          "null"
                        ) : (
                          <CheckSharpIcon />
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {item.nilai_spiritual === null ? (
                          "null"
                        ) : (
                          <CheckSharpIcon />
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {item.nilai_kds.length === 0 ? (
                          "null"
                        ) : (
                          <CheckSharpIcon />
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {item.nilai_kds.length === 0 ? (
                          "null"
                        ) : (
                          <CheckSharpIcon />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Link to={"/edit-nilai-siswa/" + item.user.id}>
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
