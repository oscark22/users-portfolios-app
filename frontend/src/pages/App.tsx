import { Box, Button, Container, Typography } from "@mui/material";
import CardActionDisplay from "../components/card-action-display";
import { Link } from "react-router-dom";
import Layout from "../Layout";

function App() {
  return (
    <>
      <Box>
        <Link to="/login">
          <Button variant="outlined">Login</Button>
        </Link>
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
