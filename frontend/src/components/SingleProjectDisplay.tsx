import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import Layout from "../Layout";
import { Project } from "../interfaces/Project";
import { Link } from "react-router-dom";

const SingleProjectDisplay: React.FC<Project> = ({
  id,
  name,
  description,
  manager,
  developers,
}) => {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "semibold" }}>
          Manager: {manager}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "semibold" }}>
          Description: {description}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "semibold" }}>
          Developers:
        </Typography>
        {developers.length !== 0 ? (
          developers.map((developer) => (
            <Card sx={{ border: 1, width: "100%" }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {developer.first_name} {developer.last_name}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Box>
            <Typography>This project does not contain developers.</Typography>
          </Box>
        )}
      </Box>
      <Link to="/">
        <Button type="button" variant="contained" sx={{ mt: 2 }}>
          Go back
        </Button>
      </Link>
    </Layout>
  );
};

export default SingleProjectDisplay;
