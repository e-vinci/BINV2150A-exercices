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
  Modal,
  IconButton,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { Recipe } from "../models/recipe";
import { categories } from "../data/categories";
import { RecipeDetail } from "./RecipeDetail";
import { useState } from "react";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const RecipeCard = (recipe: Recipe) => {
  const [open, setOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        src={recipe.imageUrl}
        sx={{
          height: 200,
          width: "100%",
          objectFit: "cover",
        }}
      ></CardMedia>
      <CardContent>
        <Stack direction={"row"} sx={{ mb: 3 }} spacing={3}>
          <Typography
            variant="h6"
            component={"h2"}
            color="primary"
            sx={{
              textWrap: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {recipe.title}
          </Typography>

          {recipe.categoryId && (
            <Chip
              variant="outlined"
              label={categories.find((c) => c.id === recipe.categoryId)?.name}
            ></Chip>
          )}
        </Stack>

        {recipe.description && (
          <Typography component={"p"} sx={{ mb: 2 }}>
            {recipe.description}
          </Typography>
        )}

        <Stack spacing={2} direction={"row"} sx={{ mb: 1 }}>
          <AccessTimeIcon />
          <Typography component={"p"}>{recipe.prepTime}</Typography>
        </Stack>

        <Stack direction={"row"} spacing={2} sx={{ mb: 2 }}>
          {recipe.tags.map((t) => (
            <Chip key={t} variant="filled" label={t}></Chip>
          ))}
        </Stack>

        <Rating
          icon={<SoupKitchenIcon />}
          emptyIcon={<SoupKitchenIcon />}
          value={recipe.difficulty}
          max={5}
          readOnly
        />
      </CardContent>
      <CardActions>
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained" onClick={handleOpen}>
            MODAL
          </Button>

          <IconButton
            color="primary"
            aria-label={
              isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
            }
            onClick={() => setIsFavorite((prev) => !prev)}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Stack>

        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: "flex",
            backdropFilter: "hue-rotate(160deg)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RecipeDetail {...recipe} />
        </Modal>
      </CardActions>
    </Card>
  );
};
