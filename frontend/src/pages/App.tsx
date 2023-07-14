import { Box, Button, Container, Typography } from "@mui/material";
import CardActionDisplay from "../components/card-action-display";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <>
      <Box>
        {loggedIn ? (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
            <Link to="/panel">
              <Button variant="outlined">Go to Panel</Button>
            </Link>
          </Box>
        ) : (
          <Link to="/login">
            <Button variant="outlined">Login</Button>
          </Link>
        )}
      </Box>
      <Layout>
        <Box
          sx={{
            pb: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            User's portfolios app
          </Typography>
        </Box>
        <CardActionDisplay />
      </Layout>
    </>
  );
}

export default App;
