import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}
const FavoriteButton = ({ isFavorite, onToggle }: FavoriteButtonProps) => {
    
    return (
        <IconButton 
            color = "primary"
            aria-label = {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            onClick = {onToggle}>
            
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}

        </IconButton>
    );
};
export default FavoriteButton