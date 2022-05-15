import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  CircularProgress,
  Divider,
  LinearProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import UseInsertNewUser from "../lib/mutation/UseInsertNewUser";
import UseEditUser from "../lib/mutation/UseEditUser";

export default function ModalUser({
  open,
  setOpen,
  editData,
  reload,
  setReload,
  method,
}) {
  const { InsertData, data: result, loading, error } = UseInsertNewUser();
  const { EditData, data: result1, loading1, error1 } = UseEditUser();
  const [data, setData] = useState({
    name: "",
    role: "",
    username: "",
    password: "",
    no_id: "",
    active: true,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const role = [
    {
      value: "siswa",
    },
    {
      value: "guru",
    },
    {
      value: "admin",
    },
  ];

  useEffect(() => {
    if (result !== undefined || result1?.insert_e_raport_user_one !== null) {
      setReload(reload + 1);
      setOpen(false);
    }
  }, [result, result1]);

  useEffect(() => {
    if (editData !== undefined) {
      setData({
        id: editData.id,
        name: editData.name,
        no_id: editData.no_id,
        password: editData.password,
        role: editData.role,
        username: editData.username,
        active: editData.active,
      });
    } else {
      setData({
        name: "",
        role: "",
        username: "",
        password: "",
        no_id: "",
        active: true,
      });
    }
  }, [editData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    console.log(data);
    if (method === "Tambah") {
      InsertData({ variables: { object: data } });
    } else {
      EditData({ variables: { object: data } });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2" mb="8px">
          {method} Data
        </Typography>
        <Divider />
        <form>
          <Box my="24px">
            <Typography variant="body1" color="primary.main">
              Nama
            </Typography>
            <TextField
              fullWidth
              name="name"
              variant="standard"
              value={data.name}
              onChange={handleChange}
            />
          </Box>
          <Box my="24px">
            <Typography variant="body1" color="primary.main">
              Role
            </Typography>
            <TextField
              fullWidth
              variant="standard"
              name="role"
              select
              value={data.role}
              onChange={handleChange}
            >
              {role.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box my="24px">
            <Typography variant="body1" color="primary.main">
              Username
            </Typography>
            <TextField
              fullWidth
              name="username"
              variant="standard"
              value={data.username}
              onChange={handleChange}
            />
          </Box>
          <Box my="24px">
            <Typography variant="body1" color="primary.main">
              Password
            </Typography>
            <TextField
              fullWidth
              name="password"
              type="text"
              value={data.password}
              onChange={handleChange}
              variant="standard"
            />
          </Box>
          <Box my="24px">
            <Typography variant="body1" color="primary.main">
              No ID (NISN / NIGN)
            </Typography>
            <TextField
              fullWidth
              name="no_id"
              variant="standard"
              type={"number"}
              value={data.no_id}
              onChange={handleChange}
            />
          </Box>
          <Box textAlign="center">
            {(loading || loading1) && <CircularProgress />}
            {(error || error1) && (
              <Typography color="red">
                failed, check no id and username
              </Typography>
            )}
            {result1?.insert_e_raport_user_one === null && (
              <Typography color="red">cek no id dan username</Typography>
            )}
          </Box>
          <Button
            fullWidth
            disabled={
              data.nama === "" ||
              data.no_id === "" ||
              data.password === "" ||
              data.role === "" ||
              data.username === ""
            }
            variant="contained"
            onClick={handleSubmit}
          >
            <CheckSharpIcon />
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
