
import { Chip, Rating, Stack } from "@mui/material";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";

interface RecipeCardProps {
    title: string,
    imageUrl: string,
    description?: string,
    duration: number,
    difficulty: number
    category: string
}


const RecipeCard = ({ title, imageUrl, duration, difficulty, category }: RecipeCardProps) => (
    <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="200" image={imageUrl} alt={title} />
        <CardContent>
            <Typography variant="h6" component="h2">
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Durée :  {duration} min
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Difficulté :
            </Typography>

            <Stack spacing={1} sx={{ alignItems: "flex-start" }}>
                <Rating value={difficulty} max={5} readOnly />
                <Chip label={category} color="primary" size="small" />
            </Stack>
        </CardContent>
        <CardActions>
            <Button size="small">Voir la recette </Button>
        </CardActions>
    </Card>
);

export default RecipeCard;




