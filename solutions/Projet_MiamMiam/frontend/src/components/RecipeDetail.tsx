import { Stack } from "@mui/material"
import type { Recipe } from "../models/recipe"

interface RecipeDetailProps {
    recipe: Recipe
};

const RecipeDetail = ({recipe}: RecipeDetailProps) => {
    return(
        <div>
            <Stack>
                <p>{recipe.description}</p>
                <p>Temps de préparation : {recipe.prepTime} min</p>
                <p>Temps de cuisson : {recipe.cookTime} min</p>
                <p>{recipe.servings} portions</p>
                <p>Ingrédients : </p>
                <ul>
                    {recipe.ingredients.map((ingredient) => <li key={ingredient.name}> {ingredient.quantity}{ingredient.unit} de {ingredient.name}</li>)}
                </ul>
                <p>Étapes : </p>
                <ol>
                    {recipe.steps.map((step) => <li key={step}> {step} </li>)}
                </ol>
            </Stack>
        </div>
    )
};

export default RecipeDetail;