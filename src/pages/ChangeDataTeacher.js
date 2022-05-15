import { Box, IconButton, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Sidebar from "../components/Sidebar";
import React, { useContext, useEffect, useState } from "react";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import PersonAddAltSharpIcon from "@mui/icons-material/PersonAddAltSharp";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ModalUser from "../components/ModalUser";
import UseGetAllUser from "../lib/hook/useGetAllUser";
import UseDeleteUser from "../lib/mutation/UseDeleteUser";
import { GeneralContext } from "../context/GeneralContext";

export default function AddUser() {
  const { getUser, data } = UseGetAllUser();
  const { DeleteUser, data: result } = UseDeleteUser();
  const [dataProps, setDataProps] = useState();
  const { role } = useContext(GeneralContext);
  const id = localStorage.getItem("id");

  const [open, setOpen] = React.useState(false);
  const [where, setWhere] = useState({});
  const [reload, setReload] = useState(1);

  useEffect(() => {
    if (role === "guru") {
      getUser({
        variables: { where: { active: { _eq: true }, id: { _eq: id } } },
      });
    } else {
      getUser({
        variables: { where: { active: { _eq: true }, role: { _eq: "guru" } } },
      });
    }
  }, [reload]);

  const handleOpen = (data) => {
    setDataProps(data);
    setOpen(true);
  };
  const handleDelete = (id) => {
    DeleteUser({
      variables: {
        id: id,
      },
    });
    setReload(reload + 1);
  };
  return (
    <>
      <Box display="flex" className="wrapper">
        <Sidebar />
        <Box
          style={{ backgroundColor: "#f7f7f8", overflow: "hidden" }}
          minHeight={"100vh"}
          width={"100%"}
        >
          <Box style={{ padding: "32px" }}>
            <Typography variant="h5">Ubah Data Diri Guru</Typography>
            <Box
              bgcolor={"white"}
              style={{ padding: "16px", marginTop: "32px" }}
            >
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
                        Role
                      </TableCell>
                      <TableCell sx={{ color: "primary.main" }} align="center">
                        Username
                      </TableCell>
                      <TableCell sx={{ color: "primary.main" }} align="center">
                        Nomor ID (NISN / NIGN)
                      </TableCell>
                      <TableCell sx={{ color: "primary.main" }} align="center">
                        Edit / Hapus
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.e_raport_user.map((item, key) => (
                      <TableRow
                        key={key}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {item.role}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {item.username}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {item.no_id}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Edit">
                            <IconButton onClick={() => handleOpen(item)}>
                              <EditSharpIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Hapus">
                            <IconButton onClick={() => handleDelete(item.id)}>
                              <DeleteSharpIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {role === "admin" && (
                  <Box width={"100%"} textAlign={"center"}>
                    <Tooltip title="tambah">
                      <IconButton onClick={() => handleOpen()}>
                        <PersonAddAltSharpIcon sx={{ color: "black" }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </Box>
      <ModalUser
        open={open}
        setOpen={setOpen}
        editData={dataProps}
        reload={reload}
        setReload={setReload}
      />
    </>
  );
}
