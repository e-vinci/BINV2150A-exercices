import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import type { Recipe } from "../models/recipe";

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
  const [servings, setServings] = useState(recipe.servings);
  const [showSteps, setShowSteps] = useState(true);

  const decrement = () => setServings((prev) => prev - 1);
  const increment = () => setServings((prev) => prev + 1);
  const ratio = servings / recipe.servings;

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
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Button onClick={decrement} disabled={servings === 1}>
          −
        </Button>
        <Typography variant="body2">{servings} personnes</Typography>
        <Button onClick={increment}>+</Button>
      </Stack>
      <Typography variant="h6" component="h3">
        Ingrédients
      </Typography>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.name}>
            {Math.round(ingredient.quantity * ratio * 10) / 10}{" "}
            {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>
      <Typography variant="h6" component="h3">
        Étapes
      </Typography>
      <Button onClick={() => setShowSteps((prev) => !prev)}>
        {showSteps ? "Masquer les étapes" : "Afficher les étapes"}
      </Button>
      {showSteps && (
        <ol>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default RecipeDetail;
