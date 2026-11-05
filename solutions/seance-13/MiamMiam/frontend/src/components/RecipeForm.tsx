import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, type SubmitEvent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

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

interface IngredientInput {
  key: number; // identifiant local, pour la key React
  name: string;
  quantity: string; // chaîne, comme les autres champs numériques
  unit: string;
}
type IngredientField = "name" | "quantity" | "unit"; // champs modifiables

interface StepInput {
  key: number;
  name: string;
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
  const [ingredients, setIngredients] = useState<IngredientInput[]>([]);
  const [steps, setSteps] = useState<StepInput[]>([]);

  // VALIDATIONS
  const [submitted, setSubmitted] = useState(false);
  const prepTimeError = form.prepTime < 0;
  const cookTimeError = form.cookTime < 0;
  const servingsError = form.servings < 1;
  const titleError = form.title.trim().length < 3;
  const hasOneIngredient = ingredients.length >= 1;
  const hasOneStep = steps.length >= 1;
  const allIngredientsHaveANameANDPositiveQuantity = ingredients.every(
    (i) => i.name.trim() !== "" && Number(i.quantity) > 0,
  );
  const allStepsHaveAName = steps.every((s) => s.name.trim() !== "");

  const isValid =
    !titleError &&
    !prepTimeError &&
    !cookTimeError &&
    !servingsError &&
    hasOneIngredient &&
    hasOneStep &&
    allIngredientsHaveANameANDPositiveQuantity &&
    allStepsHaveAName;

  // FORM FUNCTIONS
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

    console.log(
      ingredients.map((i) => ({
        name: i.name,
        quantity: Number(i.quantity),
        unit: i.unit,
      })),
    );
    console.log(
      steps.map((s) => ({
        name: s.name,
      })),
    );

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

    setIngredients([]);
    setSteps([]);
    setSubmitted(false);
  };

  // INGREDIENTS FUNCTIONS
  const addIngredient = () =>
    setIngredients((prev) => [
      ...prev,
      { key: Date.now(), name: "", quantity: "", unit: "g" },
    ]);

  const removeIngredient = (key: number) =>
    setIngredients(ingredients.filter((ingredient) => ingredient.key !== key));

  const updateIngredient = (
    key: number,
    field: IngredientField,
    value: string,
  ) =>
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.key === key ? { ...ingredient, [field]: value } : ingredient,
      ),
    );

  // STEPS FUNCTIONS
  const addStep = () => {
    setSteps((prev) => [...prev, { key: Date.now(), name: "" }]);
  };

  const removeStep = (key: number) => {
    setSteps(steps.filter((step) => step.key !== key));
  };

  const updateStep = (key: number, name: string) => {
    setSteps(
      steps.map((step) => (step.key === key ? { ...step, name: name } : step)),
    );
  };

  return (
    <Card
      sx={{
        minWidth: 600,
        maxHeight: 800,
        overflowY: "scroll",
        scrollbarWidth: "thin",
      }}
    >
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

          <Stack direction={"column"} spacing={1}>
            <Typography sx={{ fontSize: 20 }}>Ingrédients :</Typography>

            {submitted && !hasOneIngredient && (
              <Typography color="error">Au moins un ingrédient</Typography>
            )}

            {submitted &&
              hasOneIngredient &&
              !allIngredientsHaveANameANDPositiveQuantity && (
                <Typography color="error">
                  Tous les ingrédients doivent avoir un nom et une quantité
                  positive
                </Typography>
              )}

            {ingredients.map((ingredient) => (
              <Stack key={ingredient.key} direction="row" spacing={1}>
                <TextField
                  label="Ingrédient"
                  value={ingredient.name}
                  onChange={(e) =>
                    updateIngredient(ingredient.key, "name", e.target.value)
                  }
                />
                <TextField
                  label="Quantité"
                  type="number"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    updateIngredient(ingredient.key, "quantity", e.target.value)
                  }
                />
                <TextField
                  label="Unité"
                  value={ingredient.unit}
                  onChange={(e) =>
                    updateIngredient(ingredient.key, "unit", e.target.value)
                  }
                />
                <IconButton
                  onClick={() => removeIngredient(ingredient.key)}
                  aria-label="Retirer"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}

            <Box>
              <Button
                onClick={addIngredient}
                sx={{ justifySelf: "flex-start" }}
              >
                Ajouter un ingrédient
              </Button>
            </Box>
          </Stack>

          <Stack direction={"column"} spacing={1}>
            <Typography sx={{ fontSize: 20 }}>Etapes :</Typography>

            {submitted && !hasOneStep && (
              <Typography color="error">Au moins une étape</Typography>
            )}

            {submitted && hasOneStep && !allStepsHaveAName && (
              <Typography color="error">
                Toutes les étapes doivent avoir un nom
              </Typography>
            )}

            {steps.map((step) => (
              <Stack key={step.key} direction="row" spacing={1}>
                <TextField
                  label="Etape"
                  value={step.name}
                  onChange={(e) => updateStep(step.key, e.target.value)}
                />

                <IconButton
                  onClick={() => removeStep(step.key)}
                  aria-label="Retirer"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}

            <Box>
              <Button onClick={addStep} sx={{ justifySelf: "flex-start" }}>
                Ajouter une étape
              </Button>
            </Box>
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
