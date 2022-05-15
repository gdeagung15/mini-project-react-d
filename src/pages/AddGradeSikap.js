import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import UseGetNameUserById from "../lib/hook/UseGetNameUserById";
import UseGetNilaiSikap from "../lib/hook/UseGetNilaiSikap";
import UseInsertNilaiSikap from "../lib/mutation/UseInsertNilaiSikap";
import UseUpdateNilaiSikapFK from "../lib/mutation/UseUpdateNilaiSikapFK";

export default function AddGradeSikap() {
  const { id } = useParams();
  const { data: data1 } = UseGetNameUserById(id);
  const { data: nilaiSikap } = UseGetNilaiSikap(id);
  console.log(nilaiSikap);
  const { InsertData, data: result } = UseInsertNilaiSikap();
  const { UpdateData, data: result1 } = UseUpdateNilaiSikapFK();

  const [loading, setLoading] = useState(false);
  const [sosial, setSosial] = useState({
    berdoa: "",
    beribadah: "",
    bersyukur: "",
    toleransi: "",
  });
  const [spiritual, setSpiritual] = useState({
    berdoa: "",
    beribadah: "",
    bersyukur: "",
    toleransi: "",
  });
  const grade = [
    {
      value: "sangat baik",
    },
    {
      value: "baik",
    },
    {
      value: "cukup",
    },
    {
      value: "kurang",
    },
  ];

  useEffect(() => {
    if (nilaiSikap !== undefined) {
      if (nilaiSikap.e_raport_nilai[0].sosial !== null) {
        const temp = nilaiSikap.e_raport_nilai[0].sosial;
        setSosial({
          id: temp?.id,
          berdoa: temp?.berdoa,
          beribadah: temp?.beribadah,
          bersyukur: temp?.bersyukur,
          toleransi: temp?.toleransi,
        });
      }
      if (nilaiSikap.e_raport_nilai[0].spiritual !== null) {
        const temp = nilaiSikap.e_raport_nilai[0].spiritual;
        setSpiritual({
          id: temp?.id,
          berdoa: temp?.berdoa,
          beribadah: temp?.beribadah,
          bersyukur: temp?.bersyukur,
          toleransi: temp?.toleransi,
        });
      }
    }
  }, [nilaiSikap]);
  useEffect(() => {
    console.log(result);
    if (result?.insert_e_raport_sikap.returning.length === 2) {
      UpdateData({
        variables: {
          nilai_sosial: result.insert_e_raport_sikap.returning[0].id,
          nilai_spiritual: result.insert_e_raport_sikap.returning[1].id,
          id: data1.e_raport_user_by_pk.nilais[0].id,
        },
      });
    }
  }, [result]);

  const handleChangeSosial = (event) => {
    const { name, value } = event.target;
    setSosial({ ...sosial, [name]: value });
  };
  const handleChangeSpiritual = (event) => {
    const { name, value } = event.target;
    setSpiritual({ ...spiritual, [name]: value });
  };
  const handleSubmit = (e) => {
    // e.preventdefault();
    console.log(sosial);
    console.log(spiritual);
    InsertData({
      variables: {
        objects: [sosial, spiritual],
      },
    });
  };

  return (
    <Box display="flex" className="wrapper">
      <Sidebar />
      <Box
        style={{ backgroundColor: "#f7f7f8", overflow: "auto" }}
        minHeight={"100vh"}
        width={"100%"}
      >
        <form>
          <Box style={{ padding: "32px" }} overflow="auto">
            <Typography variant="h5" display={"flex"} flexWrap="wrap">
              {data1?.e_raport_user_by_pk.name}
              <Box color="#757575"> &nbsp; {` > Sikap Sosial & Spiritual`}</Box>
            </Typography>
            <Box
              display="flex"
              flexWrap={"wrap"}
              justifyContent={"space-arround"}
              bgcolor={"white"}
              style={{ padding: "16px", marginTop: "32px" }}
            >
              <Box marginY={"16px"} minWidth={"50%"}>
                <Typography variant="h6" color="#757575" marginBottom={"8px"}>
                  Sikap Sosial
                </Typography>
                <Box marginY={"16px"} width="100%">
                  <Typography
                    variant="body1"
                    color="primary.main"
                    marginBottom={"8px"}
                  >
                    Beribadah
                  </Typography>
                  <TextField
                    required
                    sx={{ minWidth: "70%" }}
                    name="beribadah"
                    select
                    value={sosial.beribadah}
                    onChange={handleChangeSosial}
                  >
                    {grade.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box marginY={"16px"}>
                  <Typography
                    variant="body1"
                    color="primary.main"
                    marginBottom={"8px"}
                  >
                    Berdoa
                  </Typography>
                  <TextField
                    required
                    sx={{ minWidth: "70%" }}
                    name="berdoa"
                    select
                    value={sosial.berdoa}
                    onChange={handleChangeSosial}
                  >
                    {grade.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box marginY={"16px"}>
                  <Typography
                    variant="body1"
                    color="primary.main"
                    marginBottom={"8px"}
                  >
                    Bersyukur
                  </Typography>
                  <TextField
                    required
                    sx={{ minWidth: "70%" }}
                    name="bersyukur"
                    select
                    value={sosial.bersyukur}
                    onChange={handleChangeSosial}
                  >
                    {grade.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box marginY={"16px"}>
                  <Typography
                    variant="body1"
                    color="primary.main"
                    marginBottom={"8px"}
                  >
                    Toleransi
                  </Typography>
                  <TextField
                    required
                    sx={{ minWidth: "70%" }}
                    name="toleransi"
                    select
                    value={sosial.toleransi}
                    onChange={handleChangeSosial}
                  >
                    {grade.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>
              <Box marginY={"16px"} minWidth={"50%"}>
                <Typography variant="h6" color="#757575" marginBottom={"8px"}>
                  Sikap Spiritual
                </Typography>
                <Box marginY={"16px"}>
                  <Typography
                    variant="body1"
                    color="primary.main"
                    marginBottom={"8px"}
                  >
                    Beribadah
                  </Typography>
                  <TextField
                    required
                    sx={{ minWidth: "70%" }}
                    name="beribadah"
                    select
                    value={spiritual.beribadah}
                    onChange={handleChangeSpiritual}
                  >
                    {grade.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box marginY={"16px"}>
                  <Typography
                    variant="body1"
                    color="primary.main"
                    marginBottom={"8px"}
                  >
                    Berdoa
                  </Typography>
                  <TextField
                    required
                    sx={{ minWidth: "70%" }}
                    name="berdoa"
                    select
                    value={spiritual.berdoa}
                    onChange={handleChangeSpiritual}
                  >
                    {grade.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box marginY={"16px"}>
                  <Typography
                    variant="body1"
                    color="primary.main"
                    marginBottom={"8px"}
                  >
                    Bersyukur
                  </Typography>
                  <TextField
                    required
                    sx={{ minWidth: "70%" }}
                    name="bersyukur"
                    select
                    value={spiritual.bersyukur}
                    onChange={handleChangeSpiritual}
                  >
                    {grade.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box marginY={"16px"}>
                  <Typography
                    variant="body1"
                    color="primary.main"
                    marginBottom={"8px"}
                  >
                    Toleransi
                  </Typography>
                  <TextField
                    required
                    sx={{ minWidth: "70%" }}
                    name="toleransi"
                    select
                    value={spiritual.toleransi}
                    onChange={handleChangeSpiritual}
                  >
                    {grade.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>
              <Box bgColor="white">
                <Box>
                  <Typography
                    variant="body1"
                    color="#757575"
                    marginBottom={"8px"}
                  >
                    Mohon isi semua data agar dapat menyimpan
                  </Typography>
                </Box>
                {result1?.update_e_raport_nilai_by_pk && (
                  <Typography
                    variant="body1"
                    color="green"
                    marginBottom={"8px"}
                  >
                    success
                  </Typography>
                )}
                <Button
                  disabled={
                    sosial.berdoa === "" ||
                    sosial.beribadah === "" ||
                    sosial.bersyukur === "" ||
                    sosial.toleransi === "" ||
                    spiritual.berdoa === "" ||
                    spiritual.beribadah === "" ||
                    spiritual.bersyukur === "" ||
                    spiritual.toleransi === ""
                  }
                  variant="outlined"
                  onClick={handleSubmit}
                >
                  Simpan
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
