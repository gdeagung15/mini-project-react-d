import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { KeyboardReturn, Visibility, VisibilityOff } from "@mui/icons-material";
import UseLoginUser from "../lib/hook/useLoginUser";
import { Redirect } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [redirectGo, setRedirectGo] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const { data, loginUser } = UseLoginUser();
  // const { setRole, setUsername } = useContext(GeneralContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginAction = (e) => {
    e.preventDefault();
    loginUser({ variables: loginData });
  };

  useEffect(() => {
    console.log(data);
    if (data !== undefined) {
      if (data?.e_raport_user.length === 0) {
        setErrorLogin(true);
      }
      if (data?.e_raport_user.length === 1) {
        setErrorLogin(false);
        localStorage.setItem("username", data.e_raport_user[0].username);
        localStorage.setItem("role", data.e_raport_user[0].role);
        localStorage.setItem("id", data.e_raport_user[0].id);
        // setUsername(data.e_raport_user[0].username);
        // setRole(data.e_raport_user[0].role);
        setRedirectGo(true);
      }
    }
    console.log(errorLogin);
    console.log(redirectGo);
  }, [data]);

  if (redirectGo === true) {
    return <Redirect to="/" />;
  }

  return (
    <Box
      sx={{ bgcolor: "info.main" }}
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      color="white"
    >
      <Container maxWidth="sm">
        <Box bgcolor="white" color="black" p="24px" borderRadius="16px">
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            textAlign="center"
            fontWeight="medium"
          >
            Login
          </Typography>
          <form noValidate>
            <TextField
              fullWidth
              label="Username"
              name="username"
              id="fullWidth"
              value={loginData.username}
              onChange={handleChange}
              style={{ marginBottom: "16px" }}
            />
            <FormControl
              fullWidth
              variant="outlined"
              style={{ marginBottom: "16px" }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) => handleChange(e)}
                label="Password"
                value={loginData.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {errorLogin && (
              <Typography textAlign="center" color="red">
                username atau password salah
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="medium"
              style={{ marginBottom: "16px" }}
              onClick={loginAction}
            >
              <Typography variant="button">Login</Typography>
            </Button>
          </form>
          <Typography variant="caption" fontStyle="italic" gutterBottom>
            Jika belum memiliki akun, silakan hubungi admin!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
