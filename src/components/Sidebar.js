import React, { useContext, useEffect } from "react";
import Brand from "./Brand";
import Box from "@mui/material/Box";
import { Button, Divider, Link, ListItem, Typography } from "@mui/material";
import Menu from "./Menu";
import { GeneralContext } from "../context/GeneralContext";

export default function Sidebar() {
  const { username, role, setReload, reload } = useContext(GeneralContext);

  const logoutAction = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setReload(reload + 1);
  };

  useEffect(() => {
    if (username === null) {
      setReload(reload + 1);
    }
  }, [username]);

  return (
    <Box
      sx={{
        bgcolor: "white.main",
        top: 0,
        borderRadius: 0,
        width: "250px",
        flexDirection: "column",
        px: "16px",
        height: "100vh",
        position: "sticky",
      }}
      display="inherit"
      _hover={{
        backgroundColor: "#ffffff",
      }}
    >
      <Box pt="16px">
        <Brand username={username} />
      </Box>

      <Divider style={{ margin: "8px 0px" }} />
      <Typography variant="subtitle1" color="gray" marginTop={"16px"}>
        Menu
      </Typography>
      <Box
        height={"100vh"}
        display="flex"
        flexDirection="column"
        justifyContent={"space-between"}
      >
        <Box>
          <ListItem>
            <Menu name={"Ubah Data Diri Siswa"} link="/ubah-data-siswa" />
          </ListItem>
          {role !== "siswa" && (
            <>
              <ListItem>
                <Menu name={"Masukan Nilai Siswa"} link="/nilai-siswa" />
              </ListItem>
              <ListItem>
                <Menu name={"Ubah Data Diri Guru"} link="/ubah-data-guru" />
              </ListItem>
              <ListItem>
                <Menu name={"Ubah Data Mapel"} link="/ubah-data-mapel" />
              </ListItem>
              {role === "admin" && (
                <ListItem>
                  <Menu name={"Tambah User"} link="/tambah-user" />
                </ListItem>
              )}
            </>
          )}
          <ListItem>
            <Link underline="none" onClick={logoutAction} color={"black"}>
              <Typography variant="subtitle1">Logout</Typography>
            </Link>
          </ListItem>
        </Box>
        <Box>
          <ListItem style={{ paddingBottom: "32px" }}>
            <Menu name={"Lihat Raport"} link="/lihat-raport" />
          </ListItem>
        </Box>
      </Box>
    </Box>
  );
}
