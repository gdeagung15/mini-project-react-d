import {
  Box,
  Button,
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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UseGetMapelTema from "../lib/hook/UseGetMapelTema";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import Dialogs from "../components/Dialogs";
import UseAddNewTema from "../lib/mutation/UseAddNewTema";
import UseDeleteTema from "../lib/mutation/UseDeleteTema";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";

export default function ChangeMapelTema() {
  const { mapel } = useParams();
  const { getData, data } = UseGetMapelTema(mapel);
  const { InsertData, data: result } = UseAddNewTema();
  const { DeleteTema, data: result1, loading } = UseDeleteTema();

  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(1);
  const [newTema, setNewTema] = useState("");

  useEffect(() => {
    getData();
  }, [reload]);
  useEffect(() => {
    setReload(reload + 1);
  }, [result, result1]);

  if (loading) {
    return <div>loading...</div>;
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setNewTema(value);
  };
  const handleSubmit = () => {
    console.log(newTema);
    InsertData({
      variables: {
        mapel_id: mapel,
        nama: newTema,
      },
    });
    setOpen(false);
  };
  const handleDelete = (id) => {
    DeleteTema({
      variables: {
        _eq: id,
      },
    });
  };

  return (
    <Box display="flex" className="wrapper">
      <Sidebar />
      <Box
        style={{ backgroundColor: "#f7f7f8", overflow: "hidden" }}
        minHeight={"100vh"}
        width={"100%"}
      >
        <Box style={{ padding: "32px" }}>
          <Typography variant="h5">Ubah Tema</Typography>
          <Box bgcolor={"white"} style={{ padding: "16px", marginTop: "32px" }}>
            <Box sx={{ float: "right" }}>
              <Button
                color="success"
                variant="outlined"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Tambah Tema
              </Button>
            </Box>
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
                      Nama Tema
                    </TableCell>
                    <TableCell sx={{ color: "primary.main" }} align="right">
                      Edit / Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.e_raport_mapel_by_pk.temas.map((item, key) => (
                    <TableRow
                      key={key}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {item.nama}
                      </TableCell>
                      <TableCell align="right">
                        <Link
                          to={"/ubah-data-mapel/" + mapel + "/tema/" + item.id}
                        >
                          <Tooltip title="Edit">
                            <IconButton>
                              <EditSharpIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
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
            </TableContainer>
            <Dialogs
              open={open}
              setOpen={setOpen}
              title="Tema Baru"
              handleChange={handleChange}
              value={newTema}
              handleSubmit={handleSubmit}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
