import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../Layout";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { base } from "../api/base";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Project } from "../interfaces/Project";
import ButtonGroupSubmit from "../components/button-group";

const MySwal = withReactContent(Swal);

const DeleteProject = () => {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [id, setId] = useState(-1);

  useEffect(() => {
    base
      .get("/projects")
      .then((response) => setProjectsData(response.data))
      .catch((error) => {
        MySwal.fire(
          "Operation failed",
          "An error has occurred",
          "success"
        ).then(() => location.reload());
      });
  }, []);

  const handleChangeProjectSelect = (
    event: SelectChangeEvent<string | number>,
    child: ReactNode
  ) => {
    setId(event.target.value as number);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    base
      .delete(`/projects/${id}`)
      .then(() => {
        MySwal.fire("Success", "The project has been deleted", "success").then(
          () => location.replace("/panel")
        );
      })
      .catch((error) => {
        MySwal.fire(
          "Failed operation",
          "The project couldn't be deleted",
          "error"
        );
      });
  };

  return (
    <Layout>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", my: 2 }}>
          Delete a project
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ width: "100%", mt: 1 }}>
          <InputLabel id="project-id-label-2">Project</InputLabel>
          <Select
            labelId="project-label-2"
            id="project-required-2"
            value={id}
            label="Project"
            onChange={handleChangeProjectSelect}
          >
            <MenuItem value={-1}>
              <em>None</em>
            </MenuItem>

            {projectsData.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select the corresponding project</FormHelperText>
        </FormControl>
        <ButtonGroupSubmit link="/panel" />
      </form>
    </Layout>
  );
};

export default DeleteProject;
