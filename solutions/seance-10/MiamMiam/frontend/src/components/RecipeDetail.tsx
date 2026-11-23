import {Stack, Typography } from "@mui/material";
import type { Recipe } from "../models/recipe";

export interface RecipeDetailProps{
    recipe : Recipe;
}
const RecipeDetail = ({recipe}:RecipeDetailProps)=>{
    return(
    <Stack direction="column"  spacing={2}>
        <Typography variant="h4" component="h2">{recipe.title}</Typography>
        <img src={recipe.imageUrl} alt={recipe.title} style={{ width: "100%", maxWidth: 600}} />
        <Typography variant="h6">{recipe.description}</Typography>
        <Typography variant="body1">{recipe.prepTime} min</Typography>
        <Typography variant="h5">pour {recipe.servings} personnes</Typography>
        <ul>{recipe.ingredients.map((r)=>(
                <li key={r.name}>{r.quantity} {r.unit} {r.name}</li>
        ))}
        </ul>

        <ol>
            {recipe.steps.map((r,index)=>(
                <li key={index}>{r}</li>
        ))}
        </ol>
    </Stack>
)
};
export default RecipeDetail;