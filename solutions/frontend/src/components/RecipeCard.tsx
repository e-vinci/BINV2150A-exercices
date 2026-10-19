
import { Chip, Rating, Stack } from "@mui/material";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import type { Recipe } from "../models/recipe";
import { categories } from "../data/categories";
import FavoriteButton from "./FavoriteButton";


interface RecipeCardProps {
    recipe : Recipe
}


const RecipeCard = ({ recipe }: RecipeCardProps) => {
    
    const cateName = categories.find((cat) => cat.id === recipe.categoryId)
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" height="200" image={recipe.imageUrl} alt={recipe.title} />
            <CardContent>
                <Typography variant="h6" component="h2">
                    {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Durée :  {recipe.cookTime} min
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Difficulté :
                </Typography>

                <Stack spacing={1} sx={{ alignItems: "flex-start" }}>
                    <Rating value={recipe.difficulty} max={5} readOnly />
                    <Chip label={cateName?.name ?? "Sans catégorie"} color="primary" size="small" />
                    
                    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                        {recipe.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" />
                        ))}
                    </Stack>
                </Stack>
            </CardContent>
            <CardActions>
                <Button size="small">Voir la recette </Button>
                <FavoriteButton />
            </CardActions>
        </Card>
    );
};

export default RecipeCard;




