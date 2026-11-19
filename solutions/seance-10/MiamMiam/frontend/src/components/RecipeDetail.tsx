import { Card, CardContent, List, Stack, Typography } from "@mui/material";
import type { Recipe } from "../models/recipe";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

export const RecipeDetail = (recipe: Recipe) => {
  return (
    <Card sx={{ maxWidth: 700 }}>
      <CardContent>
        <Typography
          variant="h5"
          component={"h4"}
          color="primary"
          sx={{ mb: 4 }}
        >
          {recipe.title}
        </Typography>
        <Stack spacing={2} direction={"row"} sx={{ mb: 1 }}>
          <AccessTimeIcon />
          <Typography component={"p"}>{recipe.prepTime}</Typography>
        </Stack>
        <Stack spacing={2} direction={"row"} sx={{ mb: 1 }}>
          <RestaurantMenuIcon />
          <Typography component={"p"}>{recipe.servings}</Typography>
        </Stack>

        <List>
          <ul>
            {recipe.ingredients.map((i) => (
              <li key={i.name}>
                {i.name} {i.quantity} {i.unit}
              </li>
            ))}
          </ul>
        </List>

        <List>
          <ol>
            {recipe.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </List>
      </CardContent>
    </Card>
  );
};
