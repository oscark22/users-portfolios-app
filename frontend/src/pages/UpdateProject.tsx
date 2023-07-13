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
import { Link } from "react-router-dom";
import ButtonGroupSubmit from "../components/button-group";

const MySwal = withReactContent(Swal);

interface ProjectUpdate {
  name: string;
  description: string;
  manager_id: number | string;
}

interface Managers {
  id: number;
  first_name: string;
  last_name: string;
}

const UpdateProject = () => {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [managersData, setManagersData] = useState<Managers[]>([]);

  const [id, setId] = useState(-1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [managerId, setManagerId] = useState<number | string>(-1);

  useEffect(() => {
    base
      .get("/managers")
      .then((response) => setManagersData(response.data))
      .catch((error) => {
        MySwal.fire(
          "Operation failed",
          "An error has occurred",
          "success"
        ).then(() => location.reload());
      });

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
    const id = event.target.value as number;
    const currProject: Project = projectsData.reduce(
      (foundProject: Project, item: Project) => {
        if (item.id === id) {
          return item;
        }
        return foundProject;
      },
      {} as Project
    );

    setId(id);
    setName(currProject.name);
    setDescription(currProject.description);
  };

  const handleChangeManagerSelect = (
    event: SelectChangeEvent<string | number>,
    child: ReactNode
  ) => {
    setManagerId(event.target.value as number);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data: ProjectUpdate = {
      name: name,
      description: description,
      manager_id: managerId,
    };

    base
      .put(`/projects/${id}`, data)
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
          MySwal.fire(
            "Success",
            "The project has been updated",
            "success"
          ).then(() => location.replace("/panel"));
        } else {
          MySwal.fire(
            "Failed operation",
            "The project couldn't be updated",
            "error"
          ).then(() => location.reload());
        }
      })
      .catch((error) => {
        console.log(error);
        MySwal.fire(
          "Failed operation",
          "The project couldn't be updated",
          "error"
        ).then(() => location.reload());
      });
  };

  return (
    <Layout>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", my: 2 }}>
          Update a project
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ width: "100%", mt: 1 }}>
          <InputLabel id="project-id-label">Project</InputLabel>
          <Select
            labelId="project-label"
            id="project-required"
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
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            required
            id="name-required"
            label="Name"
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: "50%" }}
          />
          <TextField
            required
            id="description-required"
            label="Description"
            margin="dense"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ width: "50%" }}
          />
        </Box>
        <FormControl sx={{ width: "100%", mt: 1 }}>
          <InputLabel id="manager-label">Manager</InputLabel>
          <Select
            labelId="manager-label"
            id="manager-required"
            value={managerId}
            label="Manager"
            onChange={handleChangeManagerSelect}
          >
            <MenuItem value={-1}>
              <em>None</em>
            </MenuItem>

            {managersData.map((manager) => (
              <MenuItem key={manager.id} value={manager.id}>
                {manager.first_name} {manager.last_name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            Select the corresponding manager of the project
          </FormHelperText>
        </FormControl>
        <ButtonGroupSubmit link="/panel" />
      </form>
    </Layout>
  );
};

export default UpdateProject;
