import { useEffect, useState } from "react";
import { loadFavorites, saveFavorites } from "../utils/storage";

export const useFavorites = () =>{
      const [favoritesOnly, setFavoritesOnly] = useState(false);
      const [favoriteIds, setFavoriteIds] = useState<number[]>(() => loadFavorites());
    
  useEffect(() => {
    saveFavorites(favoriteIds);
  },[favoriteIds]);

 


       const toggleFavorite = (id: number) => {
        setFavoriteIds(
        favoriteIds.includes(id)
            ? favoriteIds.filter((favId) => favId !== id)  // déjà favori → on retire
            : [...favoriteIds, id]                          // sinon → on ajoute
        );
         };

         return {favoritesOnly,favoriteIds,setFavoritesOnly, toggleFavorite};
}