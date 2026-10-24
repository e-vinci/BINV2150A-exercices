import { Button, Card, CardActions, CardContent, CardMedia, Chip, Rating, Typography } from "@mui/material";

interface RecipeCardProps {
  title: string;
  imageUrl: string;
  duration: number;
  difficulty: number;
  category: string;
  description?: string;
}

const RecipeCard = ({ title, imageUrl, duration, difficulty, category, description }: RecipeCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="200" image={imageUrl} alt={title} />
      <CardContent>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Chip label={category} color="primary" size="small" />
        {description && <Typography variant="body1">{description}</Typography>}
        <Typography variant="body2" color="text.secondary">
          {duration} min
        </Typography>
        <Rating value={difficulty} max={5} readOnly />
      </CardContent>
      <CardActions>
        <Button size="small">Voir la recette</Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;