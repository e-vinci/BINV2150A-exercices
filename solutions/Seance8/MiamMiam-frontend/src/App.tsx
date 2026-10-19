// Supression de l'import de app.css
// Exo 5 Import des materiaux mui
import { createTheme, CssBaseline, ThemeProvider, Box } from "@mui/material";
import PageLayout from "./components/PageLayout";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail"; // 👈 Ajout exo 6
import { recipes } from "./data/recipes";             // 👈 Ajout exo 6
// Exo 2
import miammiamLogo from "./assets/miammiam.png";

// Exo 5
// Création du thème avec l'orange MiamMiam comme couleur principale
const theme = createTheme({
  palette: {
    primary: { main: "#e65100" },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Exo 2 Image importée affichée au-dessus du titre */}
      {/* Modification pour integrer les nouveaux components */}
      <PageLayout title="MiamMiam">
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <img
            src={miammiamLogo}
            alt="MiamMiam"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>

        {/* Liste de toutes les recettes en grille */}
        <RecipeList />

        {/* Exo 6 : Affichage provisoire de la première recette sous la liste */}
        {recipes.length > 0 && <RecipeDetail recipe={recipes[2]} />}
      </PageLayout>
    </ThemeProvider>
  );
};

export default App;