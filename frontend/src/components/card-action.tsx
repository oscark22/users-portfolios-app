import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Project } from "../interfaces/Project";
import { Link } from "react-router-dom";

const CardAction: React.FC<Project> = (props: Project) => {
  return (
    <Card sx={{ border: 1, width: "100%" }}>
      <Link
        to={`/project/${props.id}`}
        state={{ state: props }}
        style={{ textDecoration: "none" }}
      >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};
export default CardAction;
