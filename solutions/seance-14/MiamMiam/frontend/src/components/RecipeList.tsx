import { Grid, Typography } from "@mui/material";
import { RecipeCard } from "./RecipeCard";
import type { Recipe } from "../models/recipe";

interface RecipeListProps {
  recipes: Recipe[];
  onDelete: (id: number) => void;
  favorites: number[];
  onToggle: (id: number) => void;
}

export const RecipeList = ({
  recipes,
  onDelete,
  favorites,
  onToggle,
}: RecipeListProps) => {
  return (
    <Grid container spacing={3}>
      {recipes.map((recipe) => (
        <Grid key={recipe.id} size={{ xs: 12, sm: 6, lg: 4 }}>
          <RecipeCard
            recipe={recipe}
            onDelete={onDelete}
            onToggle={onToggle}
            isFavorite={favorites.includes(recipe.id)}
          />
        </Grid>
      ))}
      {recipes.length === 0 && (
        <Grid size={12}>
          <Typography color="text.secondary">Aucune recette à afficher.</Typography>
        </Grid>
      )}
    </Grid>
  );
};
