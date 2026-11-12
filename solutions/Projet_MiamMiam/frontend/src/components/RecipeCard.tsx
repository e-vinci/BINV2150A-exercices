import { Card, CardMedia, CardContent, Typography, Stack, Rating, Chip, CardActions, Button } from "@mui/material";
import type { Recipe } from "../models/recipe";
import RecipeDetail from "./RecipeDetail";
import { categories } from "../data/categories";

interface RecipeCardProps {
    recipe: Recipe,
}

const RecipeCard = ({ recipe }: RecipeCardProps) => (
    <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="200" image={recipe.imageUrl} alt={recipe.title} />
        <CardContent>
            <Typography variant="h6" component="h2">
                {recipe.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Durée :  {recipe.prepTime + recipe.cookTime} min
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Difficulté :
            </Typography>

            <Stack spacing={1} sx={{ alignItems: "flex-start" }}>
                <Rating value={recipe.difficulty} max={5} readOnly />
                <Chip label={categories.map((category) => recipe.categoryId == category.id && category.name)} color="primary" size="small" />
                <Stack direction="row" spacing={0.25}>
                    {recipe.tags.map((tag) => <Chip key={tag} label={tag} color="primary" size="small" />)}
                </Stack>
            </Stack>

            <RecipeDetail recipe={recipe}/>

        </CardContent>
        <CardActions>
            <Button size="small">Voir la recette </Button>
        </CardActions>
    </Card>
);

export default RecipeCard;