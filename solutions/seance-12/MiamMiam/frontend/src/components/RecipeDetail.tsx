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

export const RecipeDetail = (recipe: Recipe) => {
  const [servings, setServings] = useState(recipe.servings);
  const [showSteps, setShowSteps] = useState(false);

  const decrement = () => setServings((prev) => prev - 1);
  const increment = () => setServings((prev) => prev + 1);

  const ratio = servings / recipe.servings;

  return (
    <Card sx={{ maxWidth: 700, minWidth: 400 }}>
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

        <List sx={{ mb: 3 }}>
          <ul>
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
          {showSteps ? "HIDE STEPS" : "SHOW STEPS"}
        </Button>

        {showSteps && (
          <List>
            <ol>
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
