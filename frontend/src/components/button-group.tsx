import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface ButtonGroupSubmit {
  link: string;
}

const ButtonGroupSubmit: React.FC<ButtonGroupSubmit> = ({ link }) => {
  return (
    <>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Link to={link}>
          <Button type="button" variant="contained" sx={{ mt: 2 }}>
            Cancel
          </Button>
        </Link>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default ButtonGroupSubmit;
