import { Container, Box, Button } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ParentComponentProps {
  children: ReactNode;
}

const Layout = (props: ParentComponentProps) => {
  return (
    <>
      <Container maxWidth="md">
        <Box sx={{ width: "100%" }}>{props.children}</Box>
      </Container>
    </>
  );
};

export default Layout;
