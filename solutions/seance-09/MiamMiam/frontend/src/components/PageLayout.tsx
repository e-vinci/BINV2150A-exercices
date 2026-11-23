import type { ReactNode } from "react";
import { AppBar, Toolbar, Container, Typography } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <AppBar color="primary" position="fixed" elevation={5} sx={{ p: 3 }}>
        <RestaurantMenuIcon />
      </AppBar>
      <Container sx={{ p: 5, mt: 7 }}>{children}</Container>
      <Toolbar
        variant="regular"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Typography>
          &copy; 2026 MiamMiam &middot; Projet du cours BINV2150-A
        </Typography>
      </Toolbar>
    </>
  );
};
