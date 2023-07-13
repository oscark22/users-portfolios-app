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
import ButtonGroupSubmit from "../components/button-group";

const MySwal = withReactContent(Swal);

interface ProjectCreate {
  name: string;
  description: string;
  manager_id: number | string;
}

interface Managers {
  id: number;
  first_name: string;
  last_name: string;
}

const CreateProject = () => {
  const [managersData, setManagersData] = useState<Managers[]>([]);

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
  }, []);

  const handleChangeSelect = (
    event: SelectChangeEvent<string | number>,
    child: ReactNode
  ) => {
    setManagerId(event.target.value as number);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data: ProjectCreate = {
      name: name,
      description: description,
      manager_id: managerId,
    };

    base
      .post("/projects", data)
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
          MySwal.fire(
            "Success",
            "A new project has been created",
            "success"
          ).then(() => location.replace("/panel"));
        } else {
          MySwal.fire(
            "Failed operation",
            "A new project has been created",
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
          Create a project
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            required
            id="name-required"
            label="Name"
            margin="dense"
            onChange={(e) => setName(e.target.value)}
            sx={{ width: "50%" }}
          />
          <TextField
            required
            id="description-required"
            label="Description"
            margin="dense"
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
            onChange={handleChangeSelect}
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

export default CreateProject;
