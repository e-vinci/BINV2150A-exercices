import type {Recipe} from "../models/recipe";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";

interface RecipeDetailProps{
    recipe : Recipe;
}

const RecipeDetail = ({recipe} : RecipeDetailProps) => {
    const [servings, setServings] = useState(recipe.servings);
    const [showSteps, setShowSteps] = useState(true);

    const decrement = () => setServings((prev) => prev - 1);
    const increment = () => setServings((prev) => prev + 1);
    const ratio = servings / recipe.servings
    return (
        <>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <IconButton onClick={decrement} disabled={servings <= 1} aria-label="Moins">
            <RemoveIcon />
            </IconButton>
            <Typography>{servings} personnes</Typography>
            <IconButton onClick={increment} aria-label="Plus">
            <AddIcon />
            </IconButton>
        </Stack>

        <div>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <p>Préparation : {recipe.prepTime} min</p>
            <p>Cuisson : {recipe.cookTime} min</p>
            <p>Portions : {recipe.servings}</p>
            <h2>Ingrédients</h2>
            <ul>
                {recipe.ingredients.map((ingredient) =>(
                    <li key = {ingredient.name}>
                        {Math.round (ingredient.quantity*ratio*10) / 10} {ingredient.unit} de {ingredient.name}
                    </li>
                ))}
            </ul>
            

            <Button onClick={() => setShowSteps((prev) => !prev)}>
                {showSteps ? "Masquer les étapes" : "Afficher les étapes"}
            </Button>
            
            <h2>Étapes</h2>
            {showSteps && (<ol>
                {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>)}
        </div>
    </>
        
    )
}

export default RecipeDetail