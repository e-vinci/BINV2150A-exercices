import { Button, IconButton, MenuItem, Rating, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { categories } from "../data/categories";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import type { NewRecipe } from "../models/recipe";

import { useRecipeDraft } from "../hooks/useRecipeDraft";


interface RecipeFormProps {
    onAdd: (recipe: NewRecipe) => number;   // type d'une fonction : (paramètres) => retour
}




const RecipeForm = ({ onAdd }: RecipeFormProps) => {
    
    

    const {handleSubmit,submitted,form,handleChange,
        titleError,setForm,
        categoryError,prepTimeError,cookTimeError,
        servingsError,ingredients,updateIngredient,removeIngredient,ingredientsError, 
        addIngredient,steps, addStep,moveStep ,removeStep, 
        updateStep, stepsError, handleClearDraft} = useRecipeDraft(onAdd);

    

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
            <Button type="button" color="inherit" onClick={handleClearDraft}>
                Effacer le brouillon
            </Button>

        </Stack>
    )

}

export default RecipeForm;


