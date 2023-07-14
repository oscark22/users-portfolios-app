import { useEffect, useState } from "react";
import { base } from "../api/base";
import { Project } from "../interfaces/Project";
import { Box, Grid } from "@mui/material";
import BasicCard from "../components/basic-card";
import { useLocation } from "react-router-dom";
import SingleProjectDisplay from "../components/project-display";

const CardDisplay = () => {
  const location = useLocation();
  const { state } = location.state;

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SingleProjectDisplay
            key={state.id}
            id={state.id}
            description={state.description}
            developers={state.developers}
            name={state.name}
            manager={state.manager}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardDisplay;
