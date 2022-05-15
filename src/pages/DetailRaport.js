import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UseGetNilaiRaportDetails from "../lib/hook/UseGetNilaiRaportDetails";
import UseGetUserRaportDetail from "../lib/hook/UseGetUserRaportDetail";

export default function DetailRaport() {
  const { id } = useParams();
  const { data: user } = UseGetUserRaportDetail(id);
  const { data: nilai } = UseGetNilaiRaportDetails(id);
  const [spiritual, setSpiritual] = useState({
    berdoa: "(belum input)",
    beribadah: "(belum input)",
    bersyukur: "(belum input)",
    toleransi: "(belum input)",
  });
  const [sosial, setSosial] = useState({
    berdoa: "(belum input)",
    beribadah: "(belum input)",
    bersyukur: "(belum input)",
    toleransi: "(belum input)",
  });
  const [loading, setLoading] = useState(true);
  const [mapelNilai, setMapelNilai] = useState();

  useEffect(() => {
    console.log(user);
    console.log(nilai);
    if (user !== undefined && nilai !== undefined) {
      console.log(nilai);

      if (user?.e_raport_user_by_pk.nilais[0].spiritual !== null) {
        setSpiritual(user?.e_raport_user_by_pk.nilais[0].spiritual);
      }
      if (user?.e_raport_user_by_pk.nilais[0].sosial !== null) {
        setSosial(user?.e_raport_user_by_pk.nilais[0].sosial);
      }
      setLoading(false);
    }
  }, [user, nilai]);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Box display="flex" className="wrapper">
      <Sidebar />
      <Box
        style={{ backgroundColor: "#f7f7f8", overflow: "auto" }}
        height={"100vh"}
        width={"100%"}
      >
        <Box style={{ padding: "32px" }}>
          <Typography variant="h5">Detail Raport</Typography>
          <Box
            bgcolor={"white"}
            style={{ padding: "64px", marginTop: "32px" }}
            width="900px"
          >
            <Box
              width={"100%"}
              display="grid"
              gridTemplateColumns="1fr 1fr"
              gap={"200px"}
            >
              <Box>
                <Box display={"grid"} gridTemplateColumns="1fr 1.5fr">
                  <Typography variant="body1" color={"#757575"}>
                    Nama Siswa :
                  </Typography>
                  <Typography variant="body1" width="100%">
                    {user?.e_raport_user_by_pk.name}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns="1fr 1.5fr">
                  <Typography variant="body1" color={"#757575"}>
                    NISN/NIS :
                  </Typography>
                  <Typography variant="body1" width="100%">
                    {user?.e_raport_user_by_pk.no_id}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns="1fr 1.5fr">
                  <Typography variant="body1" color={"#757575"}>
                    Sekolah :
                  </Typography>
                  <Typography variant="body1" width="100%">
                    SD Negeri 3 Banjar Jawa
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box display={"grid"} gridTemplateColumns="1fr 1.5fr">
                  <Typography variant="body1" color={"#757575"}>
                    Kelas :
                  </Typography>
                  <Typography variant="body1" width="100%">
                    {user?.e_raport_user_by_pk.nilais[0].kelas}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns="1fr 1.5fr">
                  <Typography variant="body1" color={"#757575"}>
                    Semester :
                  </Typography>
                  <Typography variant="body1" width="100%">
                    {user?.e_raport_user_by_pk.nilais[0].semester}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns="1fr 1.5fr">
                  <Typography variant="body1" color={"#757575"}>
                    Tahun Pelajaran:
                  </Typography>
                  <Typography variant="body1" width="100%">
                    2021/2022
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box my={"32px"}>
              <Typography variant="body1">A. Kompetensi Sikap</Typography>
              <Box>
                <Box display={"flex"} gap="24px" my="16px">
                  <Box
                    border={"1px solid #757575"}
                    padding="12px 32px"
                    width={"200px"}
                    display="flex"
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography variant="body1">Sikap Spiritual</Typography>
                  </Box>
                  <Box border={"1px solid #757575"} padding="16px">
                    <Typography variant="body1">
                      {user?.e_raport_user_by_pk.name +
                        " " +
                        spiritual?.beribadah +
                        " dalam beribadah, lalu bersyukur " +
                        spiritual?.bersyukur +
                        " serta dalam berdoa " +
                        spiritual?.berdoa +
                        " dan toleransi-nya " +
                        spiritual?.toleransi}
                    </Typography>
                  </Box>
                </Box>
                <Box display={"flex"} gap="24px" my="16px">
                  <Box
                    border={"1px solid #757575"}
                    padding="12px 32px"
                    width={"200px"}
                    display="flex"
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography variant="body1">Sikap Sosial</Typography>
                  </Box>
                  <Box border={"1px solid #757575"} padding="16px">
                    <Typography variant="body1">
                      {user?.e_raport_user_by_pk.name +
                        " " +
                        sosial?.beribadah +
                        " dalam beribadah, lalu bersyukur " +
                        sosial?.bersyukur +
                        " serta dalam berdoa " +
                        sosial?.berdoa +
                        " dan toleransi-nya " +
                        sosial?.toleransi}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box my={"32px"}>
              <Typography variant="body1">
                B. Kompetensi Pengetahuan dan Keterampilan
              </Typography>
              <Typography variant="body1" paddingLeft={"21px"}>
                KKM Satuan Pendidikan : 60
              </Typography>
              <Box>
                <Box
                  display={"grid"}
                  gridTemplateColumns="1fr 1.5fr 3.5fr"
                  my="32px"
                >
                  <Typography variant="body1" textAlign={"center"}>
                    Mata Pelajaran
                  </Typography>
                  <Typography variant="body1" textAlign={"center"}>
                    Pengetahuan
                  </Typography>
                  <Typography variant="body1" textAlign={"center"}>
                    Keterampilan
                  </Typography>
                </Box>
                {nilai?.e_raport_nilai_total.map((item, key) => (
                  <Box
                    key={key}
                    display="grid"
                    gridTemplateColumns={"2.5fr 1fr 1fr 2.5fr 1fr 1fr 2.5fr"}
                    gap="16px"
                    my="16px"
                  >
                    <Box
                      border="1px solid #757575"
                      padding="8px"
                      textAlign={"center"}
                    >
                      {item.name}
                    </Box>
                    <Box
                      border="1px solid #757575"
                      padding="8px"
                      textAlign={"center"}
                    >
                      {item.pengetahuan !== null ? item.pengetahuan : 0}
                    </Box>
                    <Box
                      border="1px solid #757575"
                      padding="8px"
                      textAlign={"center"}
                    >
                      {item.pengetahuan >= 90
                        ? "A"
                        : item.pengetahuan >= 80
                        ? "B"
                        : item.pengetahuan >= 70
                        ? "C"
                        : "D"}
                    </Box>
                    <Box
                      border="1px solid #757575"
                      padding="8px"
                      textAlign={"left"}
                    >
                      {item.pengetahuan >= 80
                        ? " sudah baik dalam pelajaran"
                        : item.pengetahuan >= 70
                        ? " perlu bimbingan dalam pelajaran"
                        : "tidak lulus"}
                    </Box>
                    <Box
                      border="1px solid #757575"
                      padding="8px"
                      textAlign={"center"}
                    >
                      {item.keterampilan !== null ? item.keterampilan : 0}
                    </Box>
                    <Box
                      border="1px solid #757575"
                      padding="8px"
                      textAlign={"center"}
                    >
                      {item.keterampilan >= 90
                        ? "A"
                        : item.keterampilan >= 80
                        ? "B"
                        : item.keterampilan >= 70
                        ? "C"
                        : "D"}
                    </Box>
                    <Box
                      border="1px solid #757575"
                      padding="8px"
                      textAlign={"left"}
                    >
                      {item.keterampilan >= 80
                        ? " sudah baik dalam keterampilan"
                        : item.keterampilan >= 70
                        ? " perlu bimbingan dalam keterampilan"
                        : "tidak lulus"}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
