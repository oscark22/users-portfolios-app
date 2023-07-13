import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Layout from "../Layout";
import { FormEvent, useState } from "react";
import { base } from "../api/base";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    base
      .post("/login", data)
      .then((response) => {
        if (response.status == 200) {
          MySwal.fire(
            "Operación exitosa",
            "Inicio de sesión válido",
            "success"
          ).then(() => location.replace("/admin"));
        } else {
          MySwal.fire(
            "Operación fallida",
            "Inicio de sesión inválido",
            "error"
          ).then(() => location.reload());
        }
      })
      .catch((error) => {
        console.log(error);
        MySwal.fire(
          "Operación fallida",
          "Inicio de sesión inválido",
          "error"
        ).then(() => location.reload());
      });
  };

  return (
    <Layout>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", my: 2 }}>
          Login
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <TextField
            required
            id="email-required"
            label="Email"
            margin="dense"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            required
            id="password-required"
            label="Password"
            margin="dense"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Box>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </Layout>
  );
};

export default Login;