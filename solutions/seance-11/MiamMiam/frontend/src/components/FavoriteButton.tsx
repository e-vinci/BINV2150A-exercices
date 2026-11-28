import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";


const FavoriteButton =()=>{
    const [isFavorite,setIsFavorite] = useState(false);

    const handleClick = () => {
        setIsFavorite( (prev) => !prev);
    }

    return (
        <IconButton color={"primary"} onClick={handleClick} aria-label={isFavorite ? "Retirer des favoris " : "Ajouter aux favoris"}>
            {isFavorite ? <Favorite/> : <FavoriteBorder/>}
        </IconButton>
    )
};
export default FavoriteButton;
