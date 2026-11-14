import { Button, Typography } from "@mui/material";
import { Link } from "react-router";

export const NotFoundPage = () => (
  <>
    <Typography variant="h4" component="h1">
      Page introuvable
    </Typography>
    <Button component={Link} to="/">
      Retour aux recettes
    </Button>
  </>
);
