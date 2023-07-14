import { useEffect, useState } from "react";
import BasicCard from "./BasicCard";
import { base } from "../api/base";
import { Project } from "../interfaces/Project";
import CardAction from "./CardAction";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

const CardActionDisplay = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    base
      .get("/projects")
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : projects.length !== 0 ? (
        projects.map((project) => (
          <Grid item xs={6}>
            <CardAction
              key={project.id}
              id={project.id}
              description={project.description}
              developers={project.developers}
              name={project.name}
              manager={project.manager}
            />
          </Grid>
        ))
      ) : (
        <Box>
          <Typography>No projects were found.</Typography>
        </Box>
      )}
    </Grid>
  );
};

export default CardActionDisplay;
