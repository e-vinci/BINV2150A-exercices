import { Stack } from "@mui/material";
import RecipeCard from "./RecipeCard";
import { recipes } from "../data/recipes";
import RecipeDetail from "./RecipeDetail";

const RecipeList = () => {
return (
    <div>
        <Stack direction = "row" spacing = {2}>
            {/*  OPTIONNEL A LA PLACE DU STACK !!!!!   <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}> */}
            {/* <RecipeCard
                title="Pancakes moelleux"
                imageUrl="https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800"
                duration={15}
                difficulty={1}
                category ="Dessert"
            /> */}
            {/* </Grid> */}
            {/* <Grid size={{ xs: 12, sm: 6, md: 4 }}> */}
            {/* <RecipeCard 
                title="Spaghetti carbonara"
                imageUrl="https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800"
                duration={15}
                difficulty={2}
                category = "Plat"
            /> */}
            {/* </Grid> */}
            {/* <Grid size={{ xs: 12, sm: 6, md: 4 }}> */}
            {/* <RecipeCard 
                title="Soupe de potiron"
                imageUrl="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800"
                duration={30}
                difficulty={1}
                category = "Entrée"
            />   */}
            {/* </Grid>
            </Grid> */}
            <Stack spacing={2}>
            {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
            </Stack>
        </Stack>

        <RecipeDetail recipe = {recipes[1]}/>
        
    </div>
    )
};

export default RecipeList