import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, type SubmitEvent } from "react";

interface RecipeFormData {
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  categoryId: number;
  difficulty: number;
  imgUrl: string;
  servings: number;
}

export const RecipeForm = () => {
  const [form, setForm] = useState<RecipeFormData>({
    title: "",
    description: "",
    prepTime: 0,
    cookTime: 0,
    difficulty: 0,
    imgUrl: "",
    categoryId: 1,
    servings: 0,
  });

  const [submitted, setSubmitted] = useState(false);
  const prepTimeError = form.prepTime < 0;
  const cookTimeError = form.cookTime < 0;
  const servingsError = form.servings < 1;
  const titleError = form.title.trim().length < 3;
  const isValid =
    !titleError && !prepTimeError && !cookTimeError && !servingsError;

  const handleChange = (name: string, value: string | number) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    setSubmitted(true);

    if (!isValid) {
      console.log("Not a valid submission");
      return;
    }

    console.log(form);
    setForm({
      title: "",
      description: "",
      prepTime: 0,
      cookTime: 0,
      difficulty: 0,
      imgUrl: "",
      categoryId: 1,
      servings: 0,
    });
    setSubmitted(false);
  };

  return (
    <Card sx={{ minWidth: 600 }}>
      <CardContent sx={{ mb: 3 }}>
        <Stack
          onSubmit={handleSubmit}
          component={"form"}
          direction={"column"}
          spacing={2}
        >
          <TextField
            label="Titre"
            name="title"
            value={form.title}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
            error={submitted && titleError}
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />

          <TextField
            type="number"
            label="Portion"
            name="servings"
            value={form.servings}
            onChange={(e) =>
              handleChange(e.target.name, Number(e.target.value))
            }
            error={submitted && servingsError}
          />
          <TextField
            type="number"
            label="Temps de préparation"
            name="prepTime"
            value={form.prepTime}
            onChange={(e) =>
              handleChange(e.target.name, Number(e.target.value))
            }
            error={submitted && prepTimeError}
          />
          <TextField
            type="number"
            label="Temps de cuisson"
            name="cookTime"
            value={form.cookTime}
            onChange={(e) =>
              handleChange(e.target.name, Number(e.target.value))
            }
            error={submitted && cookTimeError}
          />

          <TextField
            select
            label="Catégorie"
            name="categoryId"
            value={form.categoryId}
            onChange={(e) =>
              handleChange(e.target.name, Number(e.target.value))
            }
            required
          >
            <MenuItem value="1">Entrée</MenuItem>
            <MenuItem value="2">Plat</MenuItem>
            <MenuItem value="3">Dessert</MenuItem>
          </TextField>
          <Stack
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <Typography sx={{ pb: 0 }}>Difficulté : </Typography>
            <Rating
              value={form.difficulty}
              onChange={(_, value) => handleChange("difficulty", value ?? 0)}
            />
          </Stack>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
