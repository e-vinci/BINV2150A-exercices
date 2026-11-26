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
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import type { NewRecipe } from "../models/recipe";
import { useRecipeDraft } from "../hooks/useRecipeDraft";

interface RecipeFormProps {
  onAdd: (recipe: NewRecipe) => number;
}

export const RecipeForm = ({ onAdd }: RecipeFormProps) => {
  const {
    form,
    submitted,
    handleChange,
    handleSubmit,
    titleError,
    servingsError,
    prepTimeError,
    cookTimeError,
    hasOneIngredient,
    allIngredientsHaveANameANDPositiveQuantity,
    ingredients,
    updateIngredient,
    removeIngredient,
    addIngredient,
    hasOneStep,
    allStepsHaveAName,
    steps,
    updateStep,
    removeStep,
    switchSteps,
    addStep,
    cleanForm,
  } = useRecipeDraft(onAdd);

  return (
    <Card
      sx={{
        minWidth: 600,
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

            {steps.map((step, idx) => (
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

                <Stack direction={"row"}>
                  {idx > 0 && (
                    <IconButton onClick={() => switchSteps(step.key, -1)}>
                      <ArrowUpwardIcon />
                    </IconButton>
                  )}
                  {steps.length > 1 && idx != steps.length - 1 && (
                    <IconButton onClick={() => switchSteps(step.key, 1)}>
                      <ArrowDownwardIcon />
                    </IconButton>
                  )}
                </Stack>
              </Stack>
            ))}

            <Box>
              <Button onClick={addStep} sx={{ justifySelf: "flex-start" }}>
                Ajouter une étape
              </Button>
            </Box>
          </Stack>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button variant="contained" type="submit">
              Submit
            </Button>

            <Button variant="contained" onClick={() => cleanForm()}>
              Effacer le brouillon
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
