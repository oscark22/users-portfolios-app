import { useEffect, useState } from "react";
import { base } from "../api/base";
import { Project } from "../interfaces/Project";
import { Box, Grid } from "@mui/material";
import BasicCard from "../components/basic-card";

const CardDisplay = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    base
      .get("/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(projects);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div>
            {projects.map((project) => (
              <BasicCard
                key={project.id}
                id={project.id}
                description={project.description}
                developers={project.developers}
                name={project.name}
                manager={project.manager}
              />
            ))}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardDisplay;
