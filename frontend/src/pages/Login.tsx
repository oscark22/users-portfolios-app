import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Layout from "../Layout";
import { FormEvent, useState } from "react";
import { base } from "../api/base";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ButtonGroupSubmit from "../components/ButtonGroupSubmit";
import { RttRounded } from "@mui/icons-material";

const MySwal = withReactContent(Swal);

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("username", email);
    form_data.append("password", password);

    base
      .post("/token", form_data)
      .then((response) => {
        if (response.status == 200) {
          MySwal.fire(
            "Success",
            "The login operation was successful",
            "success"
          ).then(() => {
            const { access_token, token_type } = response.data;
            localStorage.setItem("token", access_token);
            location.replace("/panel");
          });
        } else {
          MySwal.fire("Failed operation", "Login not valid", "error").then(() =>
            location.reload()
          );
        }
      })
      .catch((error) => {
        console.log(error);
        MySwal.fire("Failed operation", "Login not valid", "error").then(() =>
          location.reload()
        );
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
            id="username"
            label="Email"
            margin="dense"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            required
            id="password"
            label="Password"
            margin="dense"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <ButtonGroupSubmit link="/" />
        </Box>
      </form>
    </Layout>
  );
};

export default Login;
