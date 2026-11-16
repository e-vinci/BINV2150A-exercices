import { Button, IconButton, MenuItem, Rating, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { categories } from "../data/categories";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import type { NewRecipe } from "../models/recipe";

interface RecipeFormProps {
  onAdd: (recipe: NewRecipe) => void;   // type d'une fonction : (paramètres) => retour
}


interface RecipeFormData {
    title: string;
    description: string;
    imageUrl: string;
    prepTime: string;
    cookTime: string;
    servings: string;
    difficulty: number;
    categoryId: string;
}

interface IngredientInput {
    key: number;
    name: string;
    quantity: string;
    unit: string;
}

interface StepInput {
    key: number;
    text: string;
}

type IngredientField = "name" | "quantity" | "unit";

const initialForm: RecipeFormData = {
    title: "",
    description: "",
    imageUrl: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    difficulty: 0,
    categoryId: "",
}


const RecipeForm = ({onAdd}:RecipeFormProps) => {
    const [ingredients, setIngredients] = useState<IngredientInput[]>([]);
    const [form, setForm] = useState<RecipeFormData>(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [steps, setSteps] = useState<StepInput[]>([]);

    const addStep = () =>
        setSteps([...steps, { key: Date.now(), text: "" }]);


    const removeStep = (key: number) =>
        setSteps(steps.filter((step => step.key !== key)));


    const updateStep = (key: number, text: string) =>
        setSteps(
            steps.map((step) =>
                step.key === key ? { ...step, text } : step)
        );

    const moveStep = (index: number, offset: -1 | 1) => {
        const target = index + offset;
        if (target < 0 || target >= steps.length) return;

        const copy = [...steps];
        [copy[index], copy[target]] = [copy[target], copy[index]];
        setSteps(copy);
    };

    const addIngredient = () =>
        setIngredients([...ingredients, { key: Date.now(), name: "", quantity: "", unit: "" }]);


    const removeIngredient = (key: number) =>
        setIngredients(ingredients.filter((ingredient) => ingredient.key !== key));


    const updateIngredient = (key: number, field: IngredientField, value: string) =>
        setIngredients(
            ingredients.map((ingredient) =>
                ingredient.key === key ? { ...ingredient, [field]: value } : ingredient)
        );

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value })
    };

    const titleError = form.title.trim().length < 3;
    const prepTimeError = form.prepTime === "" || Number(form.prepTime) < 0;
    const cookTimeError = form.cookTime === "" || Number(form.cookTime) < 0;
    const servingsError = form.servings === "" || Number(form.servings) < 1;
    const categoryError = form.categoryId === "";

    const validIngredients = ingredients.filter(
        (ingredients) => ingredients.name.trim() !== "" && Number(ingredients.quantity) > 0
    )
    const ingredientsError = validIngredients.length === 0;

    const stepsError = !steps.some((step) => step.text.trim() !== "");

    const isValid =
        !titleError && !prepTimeError && !cookTimeError && !servingsError && !categoryError && !ingredientsError && !stepsError;

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
        if (!isValid) return;

    onAdd({
        title: form.title.trim(),
        description: form.description,
        imageUrl: form.imageUrl,
        difficulty: form.difficulty,
        categoryId: Number(form.categoryId),   
        prepTime: Number(form.prepTime),
        cookTime: Number(form.cookTime),
        servings: Number(form.servings),
        ingredients: validIngredients.map(({ name, quantity, unit }) => ({
            name: name.trim(),
            quantity: Number(quantity),
            unit,
        })),
        steps: steps
            .map((step) => step.text.trim())
            .filter((text) => text !== ""),
        tags: [],                              
    });

    setForm(initialForm);
    setIngredients([]);
    setSteps([]);
    setSubmitted(false);

}

return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit} noValidate>
        <TextField
            label="Titre"
            name="title"
            value={form.title}
            onChange={handleChange}
            error={submitted && titleError}
            helperText={submitted && titleError ? "Au moins 3 caractères" : ""}
        />
        <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
        />


        <Typography component="legend">
            Difficulté
        </Typography>
        <Rating
            value={form.difficulty}
            onChange={(_event, newValue) =>
                setForm({ ...form, difficulty: newValue ?? 0 })
            }
        />

        <TextField
            select
            label="Catégorie"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            error={submitted && categoryError}
            helperText={submitted && categoryError ? "Choisis une catégorie" : ""}
        >
            {categories.map((category) => (
                <MenuItem key={category.id} value={String(category.id)}>
                    {category.name}
                </MenuItem>
            ))}
        </TextField>
        <TextField
            label="URL de l'image"
            name="imageUrl" value={form.imageUrl}
            onChange={handleChange} />
        <TextField
            label="Préparation (min)"
            name="prepTime"
            type="number"
            value={form.prepTime}
            onChange={handleChange}
            error={submitted && prepTimeError}
            helperText={submitted && prepTimeError ? "Temps positif ou nul requis" : ""}
        />
        <TextField
            label="Cuisson (min)"
            name="cookTime"
            type="number"
            value={form.cookTime}
            onChange={handleChange}
            error={submitted && cookTimeError}
            helperText={submitted && cookTimeError ? "Temps positif ou nul requis (0 si sans cuisson)" : ""}
        />

        <TextField
            label="Portions"
            name="servings"
            type="number"
            value={form.servings}
            onChange={handleChange}
            error={submitted && servingsError}
            helperText={submitted && servingsError ? "Au moins 1 portion" : ""}
        />

        {ingredients.map((ingredient) => (
            <Stack key={ingredient.key} direction="row" spacing={1}>
                <TextField label="Ingrédient" value={ingredient.name}
                    onChange={(e) => updateIngredient(ingredient.key, "name", e.target.value)} />
                <TextField label="Quantité" type="number" value={ingredient.quantity}
                    onChange={(e) => updateIngredient(ingredient.key, "quantity", e.target.value)} />
                <TextField label="Unité" value={ingredient.unit}
                    onChange={(e) => updateIngredient(ingredient.key, "unit", e.target.value)} />
                <IconButton type="button" onClick={() => removeIngredient(ingredient.key)} aria-label="Retirer">
                    <DeleteIcon />
                </IconButton>
            </Stack>
        ))}

        {submitted && ingredientsError && (
            <Typography color="error" variant="body2">
                Ajoutez au moins un ingrédient avec un nom et une quantité positive
            </Typography>
        )}

        <Button type="button" onClick={addIngredient}>Ajouter un ingrédient</Button>

        {steps.map((step, index) => (
            <Stack key={step.key} direction="row" spacing={1}>
                <TextField
                    label={`Étape ${index + 1}`}
                    value={step.text}
                    onChange={(e) => updateStep(step.key, e.target.value)}
                    multiline
                    minRows={2}
                    fullWidth
                />
                <IconButton
                    type="button"
                    onClick={() => moveStep(index, -1)}
                    disabled={index === 0}
                    aria-label="Monter l'étape"
                >
                    <ArrowUpwardIcon />
                </IconButton>
                <IconButton
                    type="button"
                    onClick={() => moveStep(index, 1)}
                    disabled={index === steps.length - 1}
                    aria-label="Descendre l'étape"
                >
                    <ArrowDownwardIcon />
                </IconButton>

                <IconButton type="button" onClick={() => removeStep(step.key)} aria-label="Retirer l'étape">
                    <DeleteIcon />
                </IconButton>
            </Stack>
        ))}
        {submitted && stepsError && (
            <Typography color="error" variant="body2">
                Ajoutez au moins une étape non vide
            </Typography>
        )}

        <Button type="button" onClick={addStep}>Ajouter une étape</Button>


        <Button
            type="submit"
            variant="contained">
            Créer la recette
        </Button>

    </Stack>
)

}

export default RecipeForm;

function onAdd(arg0: {
    title: string; description: string; prepTime: number; // un <input> donne toujours une string → on convertit
    // autres champs numériques convertis de la même façon
    tags: never[];
}) {
    throw new Error("Function not implemented.");
}
