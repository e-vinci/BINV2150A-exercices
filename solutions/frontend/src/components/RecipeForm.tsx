import { Button, MenuItem, Rating, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { categories } from "../data/categories";


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

const RecipeForm = () => {
    const [form, setForm] = useState<RecipeFormData>(initialForm);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value })
    };

    const titleError = form.title.trim().length < 3;
    const prepTimeError = form.prepTime === "" || Number(form.prepTime) < 0;
    const cookTimeError = form.cookTime === "" || Number(form.cookTime) < 0;
    const servingsError = form.servings === "" || Number(form.servings) < 1;
    const categoryError = form.categoryId === "";

    const isValid =
        !titleError && !prepTimeError && !cookTimeError && !servingsError && !categoryError;

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
        if (!isValid) return;

        const recipe = {
            ...form,
            prepTime: Number(form.prepTime),
            cookTime: Number(form.cookTime),
            servings: Number(form.servings),
        };

        console.log(recipe);


        setForm(initialForm);
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
            <Button
                type="submit"
                variant="contained">
                Créer la recette
            </Button>

        </Stack>
    )

}

export default RecipeForm;