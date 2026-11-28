import { Button, Card, CardActions, CardContent, CardMedia, Chip, Rating, Typography } from "@mui/material";
import type { Recipe } from "../models/recipe";
import { categories } from "../data/categories";
import FavoriteButton from "./FavoriteButton";

export interface RecipeCardProps {
    recipe : Recipe;
};

const RecipeCard = ({recipe} : RecipeCardProps) => {
        const category = categories.find((c)=>c.id===recipe.categoryId);
    return (
        <Card>
            <CardMedia component="img" height="200" image={recipe.imageUrl} alt={recipe.title}></CardMedia>
            <CardContent>
                <Typography variant="h6" component="h2">{recipe.title}</Typography>
                <Typography variant="body1" >{recipe.prepTime+recipe.cookTime} min</Typography>
                <Rating value={recipe.difficulty} max={5} readOnly></Rating>
                {recipe.description &&<Typography variant="body2" >{recipe.description}</Typography>}
                {category&&<Chip label={category.name} color="primary" size="small"></Chip>}
                {recipe.tags.map((tag)=>(
                    <Chip key={tag} label={tag} color="primary" size="small"></Chip>
                )
                )}
            </CardContent>
            <CardActions>
                <Button size="small">Voir la recette</Button>
                <FavoriteButton/>
            </CardActions>
        </Card>
            
    );   
};

export default RecipeCard;