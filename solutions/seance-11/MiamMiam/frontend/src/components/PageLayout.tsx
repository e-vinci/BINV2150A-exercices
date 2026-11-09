import type { ReactNode } from "react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" component="main">
        {children}
      </Container>
      <footer>&copy; 2026 MiamMiam</footer>
    </>
  );
};

export default PageLayout;