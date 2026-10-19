import type { ReactNode } from "react";

// Exo 8 : Import des composants de layout et typographie MUI
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    // Exo 8 : Box principale qui prend toute la hauteur pour coller le footer en bas
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Exo 8 : Remplacement de <header> par AppBar et Toolbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Exo 8 : Remplacement de <main> par Container pour centrer le contenu */}
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>

      {/* Exo 8 : Remplacement de <footer> par une Box stylisée */}
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          &copy; 2026 MiamMiam
        </Typography>
      </Box>
    </Box>
  );
};

export default PageLayout;