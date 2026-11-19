import miammiam from '../assets/miammiam.png';
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router";

interface LayoutProps {
    title: string;
    favoritesCount: number;
}

const Layout = ({ title, favoritesCount }: LayoutProps) => {
return <div className="page">
    <AppBar position="static">
        <Toolbar>
            <img src={miammiam} alt="Bannière MiamMiam" height="40" />
          <Typography variant="h6" component="h1" sx={{ ml: 2, flexGrow: 1 }}>
            {title}
          </Typography>

          <Button component={Link} to="/" color="inherit">
            Recettes
          </Button>
          <Button component={Link} to="/recipes/new" color="inherit">
            Ajouter une recette
          </Button>

          <Typography sx={{ ml: 2 }}>Favoris : {favoritesCount}</Typography>
        </Toolbar>
    </AppBar>

    <Container maxWidth="lg" component="main" sx={{ mt: 4 }}>
        <Outlet/>
      </Container>

      <footer>&copy; 2026 MiamMiam</footer>

</div>;
};

export default Layout