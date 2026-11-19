import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  Box,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { Link, Outlet } from "react-router";

export const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="fixed">
        <Toolbar>
          <RestaurantMenuIcon />

          <Box sx={{ flexGrow: 1 }} />

          <Button component={Link} to="/" color="inherit">
            Recettes
          </Button>

          <Button component={Link} to="/recipes/new" color="inherit">
            Ajouter
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ p: 5, mt: 7, flexGrow: 1 }}>
        <Outlet />
      </Container>

      <Toolbar
        variant="regular"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Typography>
          &copy; 2026 MiamMiam &middot; Projet du cours BINV2150-A
        </Typography>
      </Toolbar>
    </Box>
  );
};
