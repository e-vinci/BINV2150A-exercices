import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RecipeCard from "./RecipeCard";
import { recipes } from "../data/recipes";

const RecipeList = () => {
  // Cas de la liste vide (slide "Liste vide")
  if (recipes.length === 0) {
    return <Typography>Aucune recette pour le moment.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {recipes.map((recipe) => (
       <Grid key={recipe.id} size={{ xs: 12, sm: 6, md: 4 }}>
  <RecipeCard recipe={recipe} />
</Grid>
      ))}
    </Grid>
  );
};

export default RecipeList;