import { Typography } from "@mui/material";
import RecipeDetail from "../components/RecipeDetail";
import type { Recipe } from "../models/recipe";

interface RecipeDetailPageProps {
    recipes : Recipe []; 
}

const RecipeDetailPage = ({recipes}:RecipeDetailPageProps) =>{
    const recipe = recipes[0];

    if(!recipe){
        return <Typography>Aucune recette</Typography>;
    }

    return <RecipeDetail recipe={recipe} />;
};

export default RecipeDetailPage