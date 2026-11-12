// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'

import PageLayout from './components/PageLayout';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import { Button, Checkbox, createTheme, CssBaseline, FormControlLabel, ThemeProvider, Typography } from "@mui/material"
import { useState } from 'react';
import { recipes as initialRecipes } from './data/recipes';
import type { NewRecipe, Recipe } from './models/recipe';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';

const theme = createTheme({
  palette: {
    primary: { main: "#e65100" },
  },
})


const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes)
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);


  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavoriteIds(
      favoriteIds.includes(id)
        ? favoriteIds.filter((favId) => favId !== id)  // déjà favori → on retire
        : [...favoriteIds, id]                          // sinon → on ajoute
    );
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const text = `${recipe.title} ${recipe.description}`.toLowerCase();
    if (!text.includes(query.toLowerCase())) return false;
    if (categoryId !== null && recipe.categoryId !== categoryId) return false;
    if (favoritesOnly && !favoriteIds.includes(recipe.id)) return false;
    return true;
  });

  const addRecipe = (newRecipe: NewRecipe) => {
    const recipe: Recipe = { ...newRecipe, id: Date.now(), authorId: 1 };
    setRecipes([...recipes, recipe]);
  };

  const deleteRecipe = (id: number) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const resetFilters = () => {
    setQuery("");
    setCategoryId(null);
    setFavoritesOnly(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageLayout title="MiamMiam" favoritesCount={favoriteIds.length}>
        <RecipeForm onAdd={addRecipe} />
        <SearchBar value={query} onChange={setQuery} />
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
          <RecipeList recipes={filteredRecipes} onDelete={deleteRecipe} favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite} />
        )}
      </PageLayout>
    </ThemeProvider>
  );
};
export default App;







