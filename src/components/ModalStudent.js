import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  CircularProgress,
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import UseUpdateStudent from "../lib/mutation/UseUpdateStudent";
import { GeneralContext } from "../context/GeneralContext";

export default function ModalStudent({
  open,
  onClose,
  data,
  method,
  reload,
  setReload,
}) {
  const { UpdateData, loading, error, data: result } = UseUpdateStudent();

  const [user, setUser] = React.useState({
    name: "",
    gender: "",
    kelas: "",
    semester: "",
    birth_date: "",
    no_id: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submitAction = (e) => {
    e.preventDefault();
    if (method === "edit") {
      UpdateData({
        variables: { ...user, idNilai: data.id, id: data.user.id },
      });
    }
    setReload(reload + 1);
  };

  React.useEffect(() => {
    if (data !== undefined) {
      setUser({
        name: data.user.name,
        gender: data.user.gender,
        kelas: data.kelas,
        semester: data.semester,
        birth_date: data.user.birth_date,
        no_id: data.user.no_id,
      });
    }
    if (method === "tambah") {
      setUser({
        name: "",
        gender: "",
        kelas: "",
        semester: "",
        birth_date: "",
        no_id: "",
      });
    }
  }, [data]);
  React.useEffect(() => {}, [reload]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2" mb="8px">
          Input Data
        </Typography>
        <Divider />
        <form>
          <Box my="24px">
            <Typography variant="body1" color="primary.main">
              Nama
            </Typography>
            <TextField
              fullWidth
              id="nama"
              variant="standard"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </Box>
          <Box my="24px">
            <Typography variant="body1" color="primary.main">
              Gender
            </Typography>
            <FormControl fullWidth>
              <Select
                id="demo-simple-select"
                name="gender"
                value={user.gender}
                onChange={handleChange}
              >
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="P">P</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box my="24px">
            <Typography variant="body1" color="primary.main">
              Kelas
            </Typography>
            <TextField
              fullWidth
              id="kelas"
              variant="standard"
              type="text"
              name="kelas"
              value={user.kelas}
              onChange={handleChange}
            />
          </Box>
          <Box my="24px">
            <Typography variant="body1" color="primary.main">
              Semester
            </Typography>
            <FormControl fullWidth>
              <Select
                id="demo-simple-select"
                name="semester"
                value={user.semester}
                onChange={handleChange}
              >
                <MenuItem value="Genap">Genap</MenuItem>
                <MenuItem value="Ganjil">Ganjil</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box my="24px">
            <Typography variant="body1" color="primary.main">
              Tanggal Lahir
            </Typography>
            <TextField
              fullWidth
              id="lahir"
              variant="standard"
              type="date"
              name="birth_date"
              value={user.birth_date}
              onChange={handleChange}
            />
          </Box>
          <Box my="24px">
            <Typography variant="body1" color="primary.main">
              NISN
            </Typography>
            <TextField
              fullWidth
              id="nisn"
              variant="standard"
              type={"number"}
              name="no_id"
              value={user.no_id}
              onChange={handleChange}
            />
          </Box>
          {result && (
            <Box textAlign="center" color="green">
              Success
            </Box>
          )}
          {error && (
            <Box textAlign="center" color="red">
              Failed
            </Box>
          )}
          <Box textAlign="center">{loading && <CircularProgress />}</Box>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            onClick={submitAction}
          >
            <CheckSharpIcon />
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
