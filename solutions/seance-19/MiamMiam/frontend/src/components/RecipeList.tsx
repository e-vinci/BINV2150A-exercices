import { Grid, Typography } from "@mui/material";
import { RecipeCard } from "./RecipeCard";
import type { Recipe } from "../models/recipe";

interface RecipeListProps {
  recipes: Recipe[];
  favorites: number[];
  onToggle: (id: number) => void;
}

export const RecipeList = ({
  recipes,
  favorites,
  onToggle,
}: RecipeListProps) => {
  if (recipes.length == 0) return <Typography>NO</Typography>;

  return (
    <>
      <Grid container spacing={2}>
        {recipes.map((r) => (
          <Grid key={r.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <RecipeCard
              recipe={r}
              onToggle={onToggle}
              isFavorite={favorites.some((f) => f === r.id)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
