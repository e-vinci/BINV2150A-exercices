import {
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  Stack,
  Typography,
} from "@mui/material";
import type { Recipe } from "../models/recipe";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { Divider, Chip } from "@mui/material";

interface RecipeDetailProps {
  recipe: Recipe;
}

export const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
  const [servings, setServings] = useState(recipe.servings);
  const [showSteps, setShowSteps] = useState(false);

  const decrement = () => setServings((prev) => prev - 1);
  const increment = () => setServings((prev) => prev + 1);

  const ratio = servings / recipe.servings;

  return (
    <Card sx={{ maxWidth: 700, minWidth: 400, maxHeight: "90vh", overflowY: "auto" }}>
      <CardContent>
        <Typography
          variant="h5"
          component={"h4"}
          color="primary"
          sx={{ mb: 4 }}
        >
          {recipe.title}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {recipe.description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label={`${recipe.prepTime + recipe.cookTime} min`} size="small" />
          <Chip label={`${recipe.servings} portion(s)`} size="small" variant="outlined" />
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={2} direction={"row"} sx={{ mb: 1 }}>
          <AccessTimeIcon />
          <Typography component="p">Préparation : {recipe.prepTime} min</Typography>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Stack direction={"row"} spacing={1}>
            <RestaurantMenuIcon />
            <Typography component={"p"}>{servings}</Typography>
          </Stack>

          <Stack direction={"row"}>
            <IconButton onClick={increment} aria-label="Plus">
              <AddIcon />
            </IconButton>

            <IconButton
              onClick={decrement}
              disabled={servings <= 1}
              aria-label="Moins"
            >
              <RemoveIcon />
            </IconButton>
          </Stack>
        </Stack>

        <List sx={{ mb: 3 }} subheader={<Typography variant="h6">Ingrédients</Typography>}>
          <ul style={{ paddingLeft: 20 }}>
            {recipe.ingredients.map((i) => (
              <li key={i.name}>
                {i.name} {Number(i.quantity * ratio).toFixed(1)} {i.unit}
              </li>
            ))}
          </ul>
        </List>

        <Button
          variant="contained"
          onClick={() => setShowSteps((prev) => !prev)}
          sx={{ mb: 3 }}
        >
          {showSteps ? "Masquer les étapes" : "Afficher les étapes"}
        </Button>

        {showSteps && (
          <List>
            <ol style={{ paddingLeft: 20 }}>
              {recipe.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </List>
        )}
      </CardContent>
    </Card>
  );
};
