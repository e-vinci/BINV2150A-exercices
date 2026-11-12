import { Stack } from "@mui/material";
import RecipeCard from "./RecipeCard";
import { recipes } from "../data/recipes";

const RecipeList = () => {
  return (
    <div>
      <Stack direction="column" spacing={2}>
        {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
      </Stack>
    </div>
  );
};

export default RecipeList;
