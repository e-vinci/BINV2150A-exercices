import type { ReactNode } from "react";
import miammiam from '../assets/miammiam.png';
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

interface PageLayoutProps {
    title: string;
    children: ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
return <div className="page">
    <AppBar position = "static">
        <Toolbar>
            <img src={miammiam} alt="Bannière MiamMiam" height="40" />
          <Typography variant="h6" component="h1" sx={{ ml: 2 }}>
            {title}
          </Typography>
        </Toolbar>
    </AppBar>
    
    <Container maxWidth="lg" component="main" sx={{ mt: 4 }}>
        {children}
      </Container>

      <footer>&copy; 2026 MiamMiam</footer>
    {/* <header>
        <img src={miammiam} alt="Banniere MiamMiam" ></img>
        <h1>{title} </h1> 
    </header>
    <main>{children} </main>
    <footer>&copy; 2026 MiamMiam </footer> */}
</div>;
};

export default PageLayout

