import { useEffect, useState } from "react";
import BasicCard from "./basic-card";
import { base } from "../api/base";
import { Project } from "../interfaces/Project";
import CardAction from "./card-action";
import { Grid } from "@mui/material";

const CardActionDisplay = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    base
      .get("/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(projects);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div>
          {projects.map((project) => (
            <CardAction
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
  );
};

export default CardActionDisplay;
