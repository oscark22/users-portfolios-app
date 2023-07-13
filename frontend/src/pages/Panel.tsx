import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Layout from "../Layout";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const Panel = () => {
  return (
    <Layout>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", my: 2 }}>
          Administration panel
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Link to="/">
          <Card sx={{ border: 1 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Return to main page
              </Typography>
            </CardContent>
          </Card>
        </Link>
        <Link to="/project/add">
          <Card sx={{ border: 1 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Create project
              </Typography>
            </CardContent>
          </Card>
        </Link>
        <Link to="/project/update">
          <Card sx={{ border: 1 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Update project
              </Typography>
            </CardContent>
          </Card>
        </Link>
        <Link to="/project/delete">
          <Card sx={{ border: 1 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Delete project
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Box>
    </Layout>
  );
};

export default Panel;
