import {Button, Stack, Typography } from "@mui/material";
import type { Recipe } from "../models/recipe";
import { useState } from "react";
import { Add, Remove } from "@mui/icons-material";

export interface RecipeDetailProps{
    recipe : Recipe;
}
const RecipeDetail = ({recipe}:RecipeDetailProps)=>{
    const [count,setCount] = useState(recipe.servings);

    const increment = () => setCount( (prev => prev+1 ));
    const decrement = () => setCount( (prev => prev-1 ));

    const [showSteps,setShowSteps] = useState(false);
    
    const toggleSteps = () => {
        setShowSteps ( (prev ) => !prev);
    }

    return(
    <Stack direction="column"  spacing={2}>
        <Typography variant="h4" component="h2">{recipe.title}</Typography>
        <img src={recipe.imageUrl} alt={recipe.title} style={{ width: "100%", maxWidth: 600}} />
        <Typography variant="h6">{recipe.description}</Typography>
        <Typography variant="body1">{recipe.prepTime} min</Typography>
        <Stack direction="row">
        <Typography variant="h5">pour</Typography>
            <Button onClick={decrement} disabled={count<=1}>
                <Remove/>
            </Button>
            <Typography variant="h5">{count}</Typography>
            <Button onClick={increment}>
                <Add/>
            </Button>
            <Typography variant="h5">personnes</Typography>
        </Stack>
        
        <ul>{recipe.ingredients.map((r)=>(
                <li key={r.name}>{Math.round((r.quantity/recipe.servings)*count*10)/10} {r.unit} {r.name}</li>
        ))}
        </ul>
        <Button onClick={toggleSteps}>
            {showSteps ? "Masquer les étapes" : "Afficher les étapes"}
        </Button>
        
        
       
    </Stack>
)
};
export default RecipeDetail;