import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import type { ReactNode } from "react";
import miammiamImg from "../assets/miammiam.png";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <div className="page">
      <AppBar position="static">
        <Toolbar color="#e67300">
          <img src={miammiamImg} alt="Bannière MiamMiam" height="40" />
          <Typography variant="h5" component="h1" sx={{ ml: 2 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" component="main" sx={{ mt: 4 }}>
        {children}
      </Container>

      <footer>&copy; 2026 MiamMiam</footer>
    </div>
  );
};

export default PageLayout;
