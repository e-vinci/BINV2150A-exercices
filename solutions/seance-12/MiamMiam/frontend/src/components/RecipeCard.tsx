import { Button, Card, CardActions, CardContent, CardMedia, Chip, Rating, Typography } from "@mui/material";
import type { Recipe } from "../models/recipe";
import { categories } from "../data/categories";
import FavoriteButton from "./FavoriteButton";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const category = categories.filter((item) => item.id === recipe.categoryId)[0];
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="200" image={recipe.imageUrl} alt={recipe.title} />
      <CardContent>
        <Typography variant="h6" component="h2">
          {recipe.title}
        </Typography>
       <Chip label={category?.name} color="primary" size="small" />
       {recipe.tags.map((tag) => <Chip key={tag} label={tag} variant="outlined" size="small" />)}
         <Typography variant="body1">{recipe.description}</Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.prepTime + recipe.cookTime} min
        </Typography>
        <Rating value={recipe.difficulty} max={5} readOnly />
      </CardContent>
      <CardActions>
        <Button size="small">Voir la recette</Button>
        <FavoriteButton />
      </CardActions>
    </Card>
  );
};

export default RecipeCard;