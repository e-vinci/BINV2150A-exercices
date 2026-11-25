import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import CategoryFilter from "../components/CategoryFilter";
import RecipeList from "../components/RecipeList";
import SearchBar from "../components/SearchBar";
import type { Recipe } from "../models/recipe";
import { useState,useEffect } from "react";

interface HomePageProps  {
  query: string;
  debouncedQuery:string;
  setQuery: (query: string) => void;
  categoryId: number | null;
  setCategoryId: (id: number | null) => void;
  favoritesOnly: boolean;
  setFavoritesOnly: (value: boolean) => void;
  filteredRecipes: Recipe[];
  resetFilters: () => void;
  deleteRecipe: (id: number) => void;
  favoriteIds: number[];
  toggleFavorite: (id: number) => void;
};

const HomePage = ({
  query,
  debouncedQuery,
  setQuery,
  categoryId,
  setCategoryId,
  favoritesOnly,
  setFavoritesOnly,
  filteredRecipes,
  resetFilters,
  favoriteIds,
  toggleFavorite,
}: HomePageProps) => {
  const isSearching = query !== debouncedQuery;
  return (
    <>
      <SearchBar value={query} onChange={setQuery} />
      {isSearching && < Typography>Recherche...</Typography>}
      <CategoryFilter selectedId={categoryId} onSelect={setCategoryId} />
      <Typography>{filteredRecipes.length} recette(s)</Typography>
      <FormControlLabel
        control={<Checkbox checked={favoritesOnly} onChange={(e) => setFavoritesOnly(e.target.checked)} />}
        label="Favoris uniquement"
      />

      {filteredRecipes.length === 0 ? (
        <>
          <Typography>Aucune recette ne correspond à votre recherche.</Typography>
          <Button onClick={resetFilters}>Réinitialiser les filtres</Button>
        </>
      ) : (
        <RecipeList recipes={filteredRecipes} favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite} />
      )}
    </>
  );
};

export default HomePage;