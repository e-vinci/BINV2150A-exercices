import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button, MenuItem, Rating, Stack, TextField, Typography } from "@mui/material";
import { categories } from "../data/categories";

type FormValues = {
  title: string;
  description: string;
  imageUrl: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: number;
  categoryId: string;
};

const emptyForm: FormValues = {
  title: "",
  description: "",
  imageUrl: "",
  prepTime: "",
  cookTime: "",
  servings: "",
  difficulty: 1,
  categoryId: "",
};

const RecipeForm = () => {
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [showErrors, setShowErrors] = useState(false);

  const updateForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = event.target.name as keyof FormValues;
    const fieldValue = event.target.value;

    setForm((oldForm) => ({
      ...oldForm,
      [fieldName]: fieldValue,
    }));
  };

  const titleIsWrong = form.title.trim().length < 3;
  const prepTimeIsWrong = form.prepTime === "" || Number.isNaN(Number(form.prepTime)) || Number(form.prepTime) < 0;
  const cookTimeIsWrong = form.cookTime === "" || Number.isNaN(Number(form.cookTime)) || Number(form.cookTime) < 0;
  const servingsIsWrong = form.servings === "" || Number.isNaN(Number(form.servings)) || Number(form.servings) < 1;
  const categoryIsWrong = form.categoryId === "";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShowErrors(true);

    if (titleIsWrong || prepTimeIsWrong || cookTimeIsWrong || servingsIsWrong || categoryIsWrong) {
      return;
    }

    const recipe = {
      title: form.title,
      description: form.description,
      imageUrl: form.imageUrl,
      prepTime: Number(form.prepTime),
      cookTime: Number(form.cookTime),
      servings: Number(form.servings),
      difficulty: form.difficulty,
      categoryId: Number(form.categoryId),
    };

    console.log(recipe);
    setForm(emptyForm);
    setShowErrors(false);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <TextField
        label="Titre"
        name="title"
        value={form.title}
        onChange={updateForm}
        error={showErrors && titleIsWrong}
        helperText={showErrors && titleIsWrong ? "Au moins 3 caractères" : ""}
      />
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={updateForm}
        multiline
        rows={3}
      />
      <TextField label="URL de l'image" name="imageUrl" value={form.imageUrl} onChange={updateForm} />
      <TextField
        label="Préparation (min)"
        name="prepTime"
        type="number"
        value={form.prepTime}
        onChange={updateForm}
        error={showErrors && prepTimeIsWrong}
        helperText={showErrors && prepTimeIsWrong ? "Temps positif ou nul" : ""}
      />
      <TextField
        label="Cuisson (min)"
        name="cookTime"
        type="number"
        value={form.cookTime}
        onChange={updateForm}
        error={showErrors && cookTimeIsWrong}
        helperText={showErrors && cookTimeIsWrong ? "Temps positif ou nul (0 si pas de cuisson)" : ""}
      />
      <TextField
        label="Portions"
        name="servings"
        type="number"
        value={form.servings}
        onChange={updateForm}
        error={showErrors && servingsIsWrong}
        helperText={showErrors && servingsIsWrong ? "Au moins 1 portion" : ""}
      />
      <Typography>Difficulté</Typography>
      <Rating
        value={form.difficulty}
        onChange={(_event, newValue) =>
          newValue !== null && newValue !== undefined
            ? setForm((oldForm) => ({ ...oldForm, difficulty: newValue }))
            : undefined
        }
      />
      <TextField
        select
        label="Catégorie"
        name="categoryId"
        value={form.categoryId}
        onChange={updateForm}
        error={showErrors && categoryIsWrong}
        helperText={showErrors && categoryIsWrong ? "Choisissez une catégorie" : ""}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={String(category.id)}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained">
        Créer la recette
      </Button>
    </Stack>
  );
};

export default RecipeForm;