import { Typography } from "@mui/material";
import type { Recipe } from "../models/recipe";

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
  return (
    <div>
      <Typography variant="h4" component="h2">
        {recipe.title}
      </Typography>
      <Typography variant="body1">{recipe.description}</Typography>
      <Typography variant="body2">
        Préparation : {recipe.prepTime} min
      </Typography>
      <Typography variant="body2">Cuisson : {recipe.cookTime} min</Typography>
      <Typography variant="body2">Portions : {recipe.servings}</Typography>
      <Typography variant="h6" component="h3">
        Ingrédients
      </Typography>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.name}>
            {ingredient.quantity} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>
      <Typography variant="h6" component="h3">
        Étapes
      </Typography>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;
