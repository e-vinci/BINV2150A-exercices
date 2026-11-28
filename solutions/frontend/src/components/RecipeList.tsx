import { Grid } from "@mui/material";
import RecipeCard from "./RecipeCard";

import type { Recipe } from "../models/recipe";

interface RecipeListProps {
    recipes: Recipe[]
    favoriteIds: number[];
    onToggleFavorite: (id: number) => void;
}
const RecipeList = ({ recipes, favoriteIds, onToggleFavorite }: RecipeListProps) => {
   

    return (
        <div>
            {/* <Stack direction="row" spacing={2}>
                <Stack spacing={2}>
                    {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} onDelete={onDelete} />)}
                </Stack>
            </Stack> */}
            <Grid container spacing={2}>
                {recipes.map((recipe) => <Grid key={recipe.id} spacing={2}> <RecipeCard recipe={recipe}  isFavorite={favoriteIds.includes(recipe.id)}
                    onToggleFavorite={onToggleFavorite} /> </Grid>)}
            </Grid>


            

        </div>
    )
};

export default RecipeList