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
import UseGetNotStudentYet from "../lib/hook/UseGetNotStudentYet";
import UseInsertStudent from "../lib/mutation/UseInsertStudent";

export default function ModalStudentAdd({
  open,
  onClose,
  method,
  reload,
  setReload,
}) {
  const { data } = UseGetNotStudentYet();
  const { InsertData, loading } = UseInsertStudent();

  const [user, setUser] = React.useState({
    user_id: 0,
    kelas: "",
    semester: "",
    tahun_ajaran: "",
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
    InsertData({
      variables: { object: user },
    });
    setReload(reload + 1);
  };

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
          Tambah Siswa
        </Typography>
        <Divider />
        <form>
          <Box my="24px">
            <Typography variant="body1" color="primary.main">
              User
            </Typography>
            <FormControl fullWidth>
              <Select
                id="demo-simple-select"
                name="user_id"
                value={user.user_id}
                onChange={handleChange}
              >
                {data?.e_raport_user.map((item, key) => (
                  <MenuItem key={key} value={item.id}>
                    {item.name + " - " + item.username}
                  </MenuItem>
                ))}
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
              Tahun Ajaran
            </Typography>
            <TextField
              fullWidth
              id="nama"
              variant="standard"
              name="tahun_ajaran"
              value={user.tahun_ajaran}
              onChange={handleChange}
            />
          </Box>
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
