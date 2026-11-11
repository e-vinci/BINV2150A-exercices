import type { ReactNode } from "react";
import { AppBar, Container, Typography, Stack, Badge } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface PageLayoutProps {
  children: ReactNode;
  favoriteCount: number;
}

export const PageLayout = ({ children, favoriteCount }: PageLayoutProps) => {
  return (
    <>
      <AppBar color="primary" position="sticky" elevation={3} sx={{ p: 1 }}>
        <Container>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <RestaurantMenuIcon />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>MiamMiam</Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Le carnet des recettes maison
          </Typography>
          <Typography sx={{ marginLeft: "auto" }}>
            <Badge badgeContent={favoriteCount} color="secondary">
              <FavoriteIcon />
            </Badge>
          </Typography>
        </Stack>
        </Container>
      </AppBar>
      <Container
        component="main"
        maxWidth="lg"
        sx={{ py: 4, minHeight: "calc(100vh - 130px)" }}
      >
        {children}
      </Container>

      <Stack
        component="footer"
        sx={{
          py: 3,
          alignItems: "center",
          backgroundColor: "#2f2925",
        }}
      >
        <Typography variant="body2" sx={{ color: "#d7ccc4" }}>
          &copy; 2026 MiamMiam · Projet du cours BINV2150-A ·{" "}
          {favoriteCount} favori(s)
        </Typography>
      </Stack>
    </>
  );
};
