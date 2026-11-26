import { useEffect, useState } from "react";
import { loadFavorites, saveFavorites } from "../utils/storage";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(() => loadFavorites());

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const addFavorite = (id: number) => setFavorites((prev) => [...prev, id]);
  const removeFavorite = (id: number) =>
    setFavorites(favorites.filter((i) => i !== id));

  const toggleFavorite = (id: number) =>
    favorites.some((f) => f === id) ? removeFavorite(id) : addFavorite(id);

  return {
    favorites,
    toggleFavorite,
  };
};
