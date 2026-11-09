import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";

const FavoriteButton = () => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <IconButton 
            color = "primary"
            aria-label = {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            onClick = {() => setIsFavorite((prev) => !prev)}>
            
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}

        </IconButton>
    );
};
export default FavoriteButton