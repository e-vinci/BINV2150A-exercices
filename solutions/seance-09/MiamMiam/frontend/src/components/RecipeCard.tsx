import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Rating,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export interface RecipeCardProps {
  title: string;
  imageUrl: string;
  duration: number;
  difficulty: number;
  description?: string;
  category?: string;
}

// 6. Réécrivez RecipeCard avec Card , CardMedia , CardContent , CardActions et Typography
export const RecipeCard = ({
  title,
  imageUrl,
  duration,
  difficulty,
  description,
  category,
}: RecipeCardProps) => {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia component="img" src={imageUrl}></CardMedia>
      <CardContent>
        <Stack direction={"row"} sx={{ mb: 3 }} spacing={3}>
          <Typography variant="h5" component={"h2"} color="primary">
            {title}
          </Typography>

          {category && <Chip variant="outlined" label={category}></Chip>}
        </Stack>

        {description && (
          <Typography component={"p"} sx={{ mb: 2 }}>
            {description}
          </Typography>
        )}

        <Stack spacing={2} direction={"row"} sx={{ mb: 1 }}>
          <AccessTimeIcon />
          <Typography component={"p"}>{duration}</Typography>
        </Stack>

        <Rating value={difficulty} max={10} readOnly />
      </CardContent>
      <CardActions>
        <Button variant="contained">CLICK</Button>
      </CardActions>
    </Card>
  );
};
