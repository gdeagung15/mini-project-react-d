import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import UseGetMapelTemaDetail from "../lib/hook/UseGetMapelTemaDetail";
import UseChangeMapelKD from "../lib/mutation/UseChangeMapelKD";
import { Link } from "react-router-dom";

export default function ChangeMapelKD() {
  const { mapel, tema } = useParams();
  const { data, loading } = UseGetMapelTemaDetail(tema);
  const { UpdateData, data: result } = UseChangeMapelKD();

  const [nama, setNama] = useState("");
  const [object, setObject] = useState([]);

  useEffect(() => {
    if (data !== undefined) {
      setNama(data.e_raport_tema_by_pk.nama);
      const value = data.e_raport_tema_by_pk.kds.map((item) => {
        return {
          id: item.id,
          tema_id: data.e_raport_tema_by_pk.id,
          nama: item.nama,
        };
      });
      setObject(value);
      console.log(value);
      console.log(object);
    }
  }, [data]);

  const handleChangeNama = (e) => {
    setNama(e.target.value);
  };
  const handleChange = (e, id) => {
    const { value } = e.target;
    const newArr = object.map((item, key) => {
      if (key === id) {
        return { ...item, nama: value };
      }
      return item;
    });
    setObject(newArr);
  };
  const handleTambah = () => {
    setObject([...object, { tema_id: data.e_raport_tema_by_pk.id, nama: "" }]);
  };
  const handleSubmit = () => {
    console.log(object);
    UpdateData({ variables: { id: tema, nama: nama, objects: object } });
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box
        style={{ backgroundColor: "#f7f7f8" }}
        minHeight={"100vh"}
        width={"100%"}
      >
        <Box style={{ padding: "32px" }} height="100%">
          <Typography variant="h5">
            Ubah {data?.e_raport_tema_by_pk.nama}
          </Typography>
          <form>
            <Box bgcolor={"white"} px="16px" pb="50px" mt="32px" pt="10px">
              {loading && (
                <Typography
                  variant="body1"
                  color="#757575"
                  marginBottom={"8px"}
                >
                  loading...
                </Typography>
              )}
              <Box marginY="10px">
                <Typography
                  variant="body1"
                  color="#757575"
                  marginBottom={"8px"}
                >
                  Nama
                </Typography>
                <TextField
                  name="name"
                  fullWidth
                  value={nama}
                  onChange={handleChangeNama}
                ></TextField>
              </Box>
              <Typography variant="body1" color="#757575" marginBottom={"8px"}>
                KD - KD
              </Typography>
              {object?.map((item, key) => (
                <Box marginY="16px" paddingLeft="10px">
                  <Typography
                    variant="body1"
                    color="#757575"
                    marginBottom={"8px"}
                  >
                    Nama KD
                  </Typography>
                  <TextField
                    name="name"
                    fullWidth
                    value={item.nama}
                    onChange={(e) => handleChange(e, key)}
                  ></TextField>
                </Box>
              ))}
              <Box paddingLeft="10px" my="10px" mb="20px">
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleTambah}
                >
                  Tambah KD
                </Button>
              </Box>
              {result !== undefined && (
                <Typography variant="body1" color="green" marginBottom={"8px"}>
                  success
                </Typography>
              )}
              <Box sx={{ float: "left" }}>
                <Link
                  to={"/ubah-data-mapel/" + mapel}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="outlined" color="warning">
                    BACK
                  </Button>
                </Link>
              </Box>
              <Box sx={{ float: "right" }}>
                <Button variant="outlined" onClick={handleSubmit}>
                  Simpan
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
