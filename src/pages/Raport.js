import { Box, Button, Container, IconButton, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Sidebar from "../components/Sidebar";
import React, { Component, useContext, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import UseGetAllStudent from "../lib/hook/useGetAllStudent";
import { GeneralContext } from "../context/GeneralContext";

export default function Raport() {
  const { getData, data } = UseGetAllStudent();
  const { role } = useContext(GeneralContext);
  useEffect(() => {
    if (role === "siswa") {
      getData({
        variables: {
          where: {
            user_id: { _eq: localStorage.getItem("id") },
            user: { active: { _eq: true } },
          },
        },
      });
    } else {
      getData({
        variables: {
          where: {
            user: { active: { _eq: true } },
          },
        },
      });
    }
  }, []);

  return (
    <Box display="flex" className="wrapper">
      <Sidebar />
      <Box
        style={{ backgroundColor: "#f7f7f8", overflow: "hidden" }}
        minHeight={"100vh"}
        width={"100%"}
      >
        <Box style={{ padding: "32px" }}>
          <Typography variant="h5">Daftar Siswa</Typography>
          <Box bgcolor={"white"} style={{ padding: "16px", marginTop: "32px" }}>
            <TableContainer>
              <Table
                sx={{
                  minWidth: "300px",
                  overflow: "scroll",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "primary.main" }}>Nama</TableCell>
                    <TableCell align="right" sx={{ color: "primary.main" }}>
                      Lihat Raport
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.e_raport_nilai.map((item, key) => (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {item.user.name}
                      </TableCell>
                      <TableCell align="right">
                        <Link to={"/lihat-raport/" + item.user.id}>
                          <Tooltip title="lihat" sx={{ marginRight: "12px" }}>
                            <IconButton>
                              <VisibilityIcon />
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
