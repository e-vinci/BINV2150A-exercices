import { Grid } from "@mui/material";
import RecipeCard from "./RecipeCard";
import { recipes } from "../data/recipes";

const RecipeList = () => {
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