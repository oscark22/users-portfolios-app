import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { Project } from "../interfaces/Project";
import SingleProjectDisplay from "./project-display";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const BasicCard: React.FC<Project> = ({
  id,
  name,
  description,
  manager,
  developers,
}) => {
  return (
    <Card sx={{ border: 1, width: "100%" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Manager: {manager}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2">Developers:</Typography>
        <ul>
          {developers.map((developer) => (
            <li key={id}>
              {developer.first_name} {developer.last_name}
            </li>
          ))}
        </ul>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};
export default BasicCard;
