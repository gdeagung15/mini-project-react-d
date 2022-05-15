import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UseGetNameUserById from "../lib/hook/UseGetNameUserById";
import UseGetAllMapel from "../lib/hook/UseGetAllMapel";

export default function ChangeGrade() {
  const { id } = useParams();

  const { data } = UseGetNameUserById(id);
  console.log(data);

  const sikap = [{ name: "Input" }];
  const mulok = [{ name: "Bahasa Bali" }];
  const { data: mapel } = UseGetAllMapel();
  return (
    <Box display="flex" className="wrapper">
      <Sidebar />
      <Box
        style={{ backgroundColor: "#f7f7f8", overflow: "hidden" }}
        minHeight={"100vh"}
        width={"100%"}
      >
        <Box style={{ padding: "32px" }}>
          <Typography variant="h5">{data?.e_raport_user_by_pk.name}</Typography>
          <Box bgcolor={"white"} style={{ padding: "16px", marginTop: "32px" }}>
            <Box marginY={"16px"}>
              <Typography
                variant="body1"
                color="primary.main"
                marginBottom={"8px"}
              >
                Sikap Sosial & Spiritual
              </Typography>
              <Box
                display={"grid"}
                gap="24px"
                gridTemplateColumns="repeat(auto-fit, 200px)"
              >
                {sikap.map((sikap, i) => {
                  return (
                    <Button
                      href={"/edit-nilai-siswa/" + id + "/sikap"}
                      variant="contained"
                      style={{ textTransform: "Capitalize" }}
                      key={`${i}-sikap`}
                    >
                      <Typography
                        variant="body2"
                        p={"6px"}
                        color="white"
                        align="center"
                      >
                        {sikap.name}
                      </Typography>
                    </Button>
                  );
                })}
              </Box>
            </Box>
            <Box marginY={"16px"}>
              <Typography
                variant="body1"
                color="primary.main"
                marginBottom={"8px"}
              >
                Mulok
              </Typography>
              <Box
                display={"grid"}
                gap="24px"
                gridTemplateColumns="repeat(auto-fit, 200px)"
              >
                {mulok.map((mulok, i) => {
                  return (
                    <Button
                      variant="contained"
                      style={{ textTransform: "Capitalize" }}
                      key={`${i}-mulok`}
                    >
                      <Typography
                        variant="body2"
                        p={"6px"}
                        color="white"
                        align="center"
                      >
                        {mulok.name}
                      </Typography>
                    </Button>
                  );
                })}
              </Box>
            </Box>
            <Divider />
            <Box marginY={"16px"}>
              <Typography
                variant="body1"
                color="primary.main"
                marginBottom={"8px"}
                align="center"
              >
                Nilai Pengetahuan
              </Typography>
              <Box
                display={"grid"}
                gap="24px"
                gridTemplateColumns="repeat(auto-fit, minmax(200px,1fr))"
              >
                {mapel?.e_raport_mapel.map((mapel, i) => {
                  return (
                    <Button
                      href={
                        "/edit-nilai-siswa/" + id + "/pengetahuan/" + mapel.id
                      }
                      variant="contained"
                      style={{ textTransform: "Capitalize" }}
                      key={`${i}-mapel`}
                    >
                      <Typography
                        variant="body2"
                        p={"8px 24px"}
                        color="white"
                        align="center"
                      >
                        {mapel.name}
                      </Typography>
                    </Button>
                  );
                })}
              </Box>
            </Box>
            <Divider />
            <Box marginY={"16px"}>
              <Typography
                variant="body1"
                color="primary.main"
                marginBottom={"8px"}
                align="center"
              >
                Nilai Keterampilan
              </Typography>
              <Box
                display={"grid"}
                gap="24px"
                gridTemplateColumns="repeat(auto-fit, minmax(200px,1fr))"
              >
                {mapel?.e_raport_mapel.map((mapel, i) => {
                  return (
                    <Button
                      href={
                        "/edit-nilai-siswa/" + id + "/keterampilan/" + mapel.id
                      }
                      variant="contained"
                      style={{ textTransform: "Capitalize" }}
                      key={`${i}-mapel`}
                    >
                      <Typography
                        variant="body2"
                        p={"8px 24px"}
                        color="white"
                        align="center"
                      >
                        {mapel.name}
                      </Typography>
                    </Button>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
