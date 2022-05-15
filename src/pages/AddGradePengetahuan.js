import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import UseGetMapelDetail from "../lib/hook/UseGetMapelDetail";
import UseGetNameUserById from "../lib/hook/UseGetNameUserById";
import UseInsertNilaiKdsPengetahuan from "../lib/mutation/UseInsertNilaiKdsPengetahuan";

export default function AddGradePengetahuan() {
  const { id, mapel } = useParams();

  const { data: data1 } = UseGetNameUserById(id);
  const { data: mapelData } = UseGetMapelDetail(mapel, id);
  const { InsertData, data: result, error } = UseInsertNilaiKdsPengetahuan();

  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);

  const agama = [
    {
      value: "Hindu",
    },
    {
      value: "Islam",
    },
    {
      value: "Kristen",
    },
  ];
  const [valueAgama, setValueAgama] = React.useState("Hindu");

  useEffect(() => {
    console.log(result);
  }, [result]);

  useEffect(() => {
    if (mapelData !== undefined && data1 !== undefined && load === false) {
      const nilai1 = mapelData.e_raport_mapel_by_pk.temas.map((item) => {
        const nilai = item.kds.map((item) => {
          data.push({
            kd_id: item.id,
            nilai_id: data1?.e_raport_user_by_pk.nilais[0].id,
            pengetahuan:
              item.nilai_kds.length === 0 ? 0 : item.nilai_kds[0].pengetahuan,
          });
          console.log(data);
          return 0;
        });
        return 0;
      });
      setLoad(true);
    }
  }, [mapelData, data1]);

  function getValue(id) {
    const result = data.find((x) => x.kd_id === id);
    return result.pengetahuan;
  }

  const onSubmit = () => {
    console.log(data);
    InsertData({
      variables: {
        objects: data,
      },
    });
  };

  const handleChange = (e, id) => {
    const { value } = e.target;
    console.log(value);
    const newArr = data.map((item, key) => {
      if (item.kd_id === id) {
        return { ...item, pengetahuan: value };
      }
      return item;
    });
    setData(newArr);
  };

  if (load === false) {
    return <div>loading...</div>;
  }
  return (
    <Box display="flex" className="wrapper">
      <Sidebar />
      <Box
        style={{ backgroundColor: "#f7f7f8", overflow: "auto" }}
        minHeight={"100vh"}
        width={"100%"}
      >
        <Box style={{ padding: "32px" }} overflow="auto">
          <Typography variant="h5" display={"flex"} flexWrap="wrap">
            {data1?.e_raport_user_by_pk.name}
            <Box color="#757575"> &nbsp; {` > Pengetahuan`}</Box>
          </Typography>
          <Box display={"flex"} flexWrap="wrap" gap="32px">
            <Box
              minWidth={"60%"}
              bgcolor={"white"}
              style={{ padding: "16px", marginTop: "32px" }}
            >
              <Box marginY={"16px"}>
                <Typography variant="h6" color="#757575" marginBottom={"8px"}>
                  {mapelData?.e_raport_mapel_by_pk.name}
                </Typography>
                {mapelData?.e_raport_mapel_by_pk.name === "agama" && (
                  <Box marginY={"16px"}>
                    <TextField
                      fullWidth
                      variant="standard"
                      id="beribadah"
                      select
                      value={valueAgama}
                      onChange={handleChange}
                    >
                      {agama.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                )}
              </Box>
              <form>
                {mapelData?.e_raport_mapel_by_pk.temas.map((item, key) => (
                  <Box marginY={"16px"} key={key}>
                    <Typography
                      variant="body1"
                      color="primary.main"
                      marginBottom={"8px"}
                    >
                      {item.nama}
                    </Typography>
                    <Divider />
                    {item.kds.map((item, key) => (
                      <Box marginY="16px" key={key}>
                        <Typography
                          variant="body1"
                          color="#757575"
                          marginBottom={"8px"}
                        >
                          {item.nama}
                        </Typography>
                        <TextField
                          name="pengetahuan"
                          fullWidth
                          value={getValue(item.id)}
                          type="number"
                          onChange={(e) => handleChange(e, item.id)}
                        ></TextField>
                      </Box>
                    ))}
                  </Box>
                ))}
                {result?.insert_e_raport_nilai_kd && (
                  <Typography variant="h6" color="green" marginBottom={"8px"}>
                    success
                  </Typography>
                )}
                {error && (
                  <Typography variant="h6" color="red" marginBottom={"8px"}>
                    failed
                  </Typography>
                )}
                <Box>
                  <Box sx={{ float: "left" }}>
                    <Link
                      to={"/edit-nilai-siswa/" + id}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="outlined" color="warning">
                        BACK
                      </Button>
                    </Link>
                  </Box>
                  <Box sx={{ float: "right" }}>
                    <Button variant="outlined" onClick={onSubmit}>
                      Simpan
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
            <Box
              minWidth={"30%"}
              bgcolor={"white"}
              style={{ padding: "16px", marginTop: "32px" }}
            >
              <Box marginY={"16px"}>
                <Typography variant="h6" color="black" marginBottom={"8px"}>
                  Tema dan KD
                </Typography>
                <Box>
                  {mapelData?.e_raport_mapel_by_pk.temas.map((item, key) => (
                    <List>
                      <Typography variant="body1" color="#757575">
                        {item.nama}
                      </Typography>
                      {item.kds.map((item, key) => (
                        <>
                          <ListItem>
                            <Typography variant="body2" color="#757575">
                              {item.nama}
                            </Typography>
                          </ListItem>
                        </>
                      ))}
                    </List>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
