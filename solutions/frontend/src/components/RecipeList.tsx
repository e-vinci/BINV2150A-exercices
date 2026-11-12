import { Grid } from "@mui/material";
import RecipeCard from "./RecipeCard";
import RecipeDetail from "./RecipeDetail";
import type { Recipe } from "../models/recipe";

interface RecipeListProps {
    recipes: Recipe[]
    onDelete: (id: number) => void;
    favoriteIds: number[];
    onToggleFavorite: (id: number) => void;
}
const RecipeList = ({ recipes, onDelete, favoriteIds, onToggleFavorite }: RecipeListProps) => {
   

    return (
        <div>
            {/* <Stack direction="row" spacing={2}>
                <Stack spacing={2}>
                    {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} onDelete={onDelete} />)}
                </Stack>
            </Stack> */}
            <Grid container spacing={2}>
                {recipes.map((recipe) => <Grid spacing={2}> <RecipeCard key={recipe.id} recipe={recipe} onDelete={onDelete} isFavorite={favoriteIds.includes(recipe.id)}
                    onToggleFavorite={onToggleFavorite} /> </Grid>)}
            </Grid>


            <RecipeDetail recipe={recipes[0]} />

        </div>
    )
};

export default RecipeList