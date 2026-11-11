import { Grid, Typography } from "@mui/material";
import { RecipeCard } from "./RecipeCard";
import { recipes } from "../data/recipes";

export const RecipeList = () => {
  if (recipes.length == 0) return <Typography>NO</Typography>;

  return (
    <>
      <Grid container spacing={2}>
        {recipes.map((r) => (
          <Grid key={r.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <RecipeCard {...r} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
