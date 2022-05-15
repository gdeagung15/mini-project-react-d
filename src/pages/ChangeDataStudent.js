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
import ModalStudent from "../components/ModalStudent";
import UseGetAllStudent from "../lib/hook/useGetAllStudent";
import { GeneralContext } from "../context/GeneralContext";
import ModalStudentAdd from "../components/ModalStudentAdd";
import UseDeleteNilaiUser from "../lib/mutation/UseDeleteNilaiUser";

export default function ChangeDataStudent() {
  const { getData, data } = UseGetAllStudent();
  const { role } = useContext(GeneralContext);
  const { DeleteUser, loading, data: result } = UseDeleteNilaiUser();
console.log(data)
  const [open, setOpen] = useState(false);
  const [openTambah, setOpenTambah] = useState(false);
  const [reload, setReload] = useState(1);
  const [editData, setEditData] = useState();
  const [method, setMethod] = useState();

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
      console.log("test")
      getData({
        variables: {
          where: {
            user: { active: { _eq: true } },
          },
        },
      });
    }
  }, [reload]);

  useEffect(() => {
    setReload(reload + 1);
  }, [result]);

  if (loading) {
    return <div>loading...</div>;
  }

  const handleOpen = (method, edit) => {
    setMethod(method);
    setEditData(edit);
    setOpen(true);
  };
  const handleDelete = (id) => {
    DeleteUser({ variables: { id: id } });
  };
  const handleClose = () => setOpen(false);
  const handleCloseTambah = () => setOpenTambah(false);
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
            <Typography variant="h5">Ubah Data Diri Siswa</Typography>
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
                        Gender
                      </TableCell>
                      <TableCell sx={{ color: "primary.main" }} align="center">
                        Kelas
                      </TableCell>
                      <TableCell sx={{ color: "primary.main" }} align="center">
                        Semester
                      </TableCell>
                      <TableCell sx={{ color: "primary.main" }} align="center">
                        Tanggal Lahir
                      </TableCell>
                      <TableCell sx={{ color: "primary.main" }} align="center">
                        Edit / Delete
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
                          {item.user.gender}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {item.kelas}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {item.semester}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {item.user.birth_date}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => handleOpen("edit", item)}
                            >
                              <EditSharpIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDelete(item.id)}>
                              <DeleteSharpIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {role !== "siswa" && (
                  <Box width={"100%"} textAlign={"center"}>
                    <Tooltip title="tambah">
                      <IconButton onClick={() => setOpenTambah(true)}>
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
      <ModalStudent
        open={open}
        onClose={handleClose}
        data={editData}
        method={method}
        reload={reload}
        setReload={setReload}
      />
      <ModalStudentAdd
        open={openTambah}
        onClose={handleCloseTambah}
        method={method}
        reload={reload}
        setReload={setReload}
      />
    </>
  );
}
