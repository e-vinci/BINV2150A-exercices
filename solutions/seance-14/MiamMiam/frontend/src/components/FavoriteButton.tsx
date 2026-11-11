import { IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export const FavoriteButton = ({
  isFavorite,
  onToggle,
}: FavoriteButtonProps) => {
  return (
    <Tooltip title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}>
      <IconButton
      color={isFavorite ? "error" : "default"}
      aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      onClick={onToggle}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};
