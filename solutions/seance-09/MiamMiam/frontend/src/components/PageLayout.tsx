import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { Children, type ReactNode } from "react";

export interface PageLayoutProps {
    title : string,
    children : ReactNode
};

const PageLayout  = ({title,children}: PageLayoutProps) => {
    return(
        <>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="h1">{title}</Typography>
            </Toolbar>
        </AppBar>
        <main>
            <Container>
               {children} 
            </Container>
        </main>
        <footer>
            <p>© 2026 MiamMiam.</p>
        </footer>
        </>

    )
};

export default PageLayout;