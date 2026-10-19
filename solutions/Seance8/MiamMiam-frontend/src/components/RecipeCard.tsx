import {Card,CardMedia,CardContent,CardActions,Typography,Button,Chip,Rating,Stack,Box,} from "@mui/material";
import type { Recipe } from "../models/recipe";
import { categories } from "../data/categories";
import FavoriteButton from "./FavoriteButton";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  // Recherche de la catégorie associée à la recette
  if (!recipe) {
    return null;
  }
  const category = categories.find((c) => c.id === recipe.categoryId);
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", height: "100%" }}>
      {recipe.imageUrl && (
        <CardMedia
          component="img"
          height="200"
          image={recipe.imageUrl}
          alt={recipe.title}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        {/* Catégorie et tags */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
          {category && (
            <Chip
              label={category.name}
              color="primary"
              size="small"
            />
          )}

          {recipe.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              variant="outlined"
              size="small"
            />
          ))}
        </Box>

        <Typography variant="h6" component="h2" gutterBottom>
          {recipe.title}
        </Typography>

        {recipe.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {recipe.description}
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary">
          Durée : {totalTime} min (prépa : {recipe.prepTime} min, cuisson : {recipe.cookTime} min)
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
  <Rating
    value={recipe.difficulty}
    max={5}
    readOnly
    size="small"
  />
          <Typography variant="caption" color="text.secondary">
            ({recipe.difficulty}/5)
          </Typography>
        </Box>
      </CardContent>

     <CardActions sx={{ justifyContent: "space-between" }}>
  <Button size="small">Voir la recette</Button>
  <FavoriteButton /> 
</CardActions>
    </Card>
  );
};

export default RecipeCard;