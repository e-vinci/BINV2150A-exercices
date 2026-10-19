import { useState } from "react";
import { Box, Typography, Divider, Stack, IconButton, Button } from "@mui/material"; // 👈 1. Ajout de Button
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import type { Recipe } from "../models/recipe";

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
  const [servings, setServings] = useState(recipe.servings);
  const [showSteps, setShowSteps] = useState(true); // 👈 2. État pour afficher/masquer les étapes

  const totalTime = recipe.prepTime + recipe.cookTime;
  const ratio = servings / recipe.servings;

  const decrement = () => setServings((prev) => prev - 1);
  const increment = () => setServings((prev) => prev + 1);

  return (
    <Box sx={{ mt: 4, p: 3, border: "1px solid #e0e0e0", borderRadius: 2 }}>
      {/* Titre */}
      <Typography variant="h4" component="h1" gutterBottom>
        {recipe.title}
      </Typography>

      {/* Description */}
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {recipe.description}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Informations générales : temps et portions */}
      <Typography variant="body2">
        <strong>Temps total :</strong> {totalTime} min (préparation : {recipe.prepTime} min, cuisson : {recipe.cookTime} min)
      </Typography>

      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 1 }}>
        <Typography variant="body2">
          <strong>Portions :</strong>
        </Typography>
        <IconButton onClick={decrement} disabled={servings <= 1} size="small" aria-label="Moins"
        >
          <RemoveIcon />
        </IconButton>
        <Typography>{servings} personnes</Typography>
        <IconButton
          onClick={increment}
          size="small"
          aria-label="Plus"
        >
          <AddIcon />
        </IconButton>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Liste des ingrédients (ul > li) */}
      <Typography variant="h6" component="h2" gutterBottom>
        Ingrédients
      </Typography>
      <ul>
        {recipe.ingredients.map((ingredient) => {
          const calculatedQuantity = Math.round(ingredient.quantity * ratio * 10) / 10;

          return (
            <li key={ingredient.name}>
              {calculatedQuantity} {ingredient.unit} {ingredient.name}
            </li>
          );
        })}
      </ul>

      <Divider sx={{ my: 2 }} />

      {/* Liste des étapes de préparation (ol > li) */}
      {/* 👈 3. Titre et bouton d'action alignés côte à côte */}
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="h6" component="h2">
          Étapes de préparation
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setShowSteps((prev) => !prev)}
        >
          {showSteps ? "Masquer les étapes" : "Afficher les étapes"}
        </Button>
      </Stack>

      {/* 👈 4. Rendu conditionnel des étapes selon showSteps */}
      {showSteps && (
        <ol>
          {recipe.steps.map((step, index) => (
            <li key={index}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {step}
              </Typography>
            </li>
          ))}
        </ol>
      )}
    </Box>
  );
};

export default RecipeDetail;