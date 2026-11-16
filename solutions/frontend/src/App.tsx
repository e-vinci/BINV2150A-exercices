
import { Button, Checkbox, createTheme, CssBaseline, FormControlLabel, ThemeProvider, Typography } from "@mui/material"
import { useState } from 'react';
import { recipes as initialRecipes } from './data/recipes';
import type { NewRecipe, Recipe } from './models/recipe';
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AddRecipePage from "./pages/AddRecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import NotFoundPage from "./pages/NotFoundPage";


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
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout title="MiamMiam" favoritesCount={favoriteIds.length} />}
          >
            <Route
              index
              element={
                <HomePage
                  query={query}
                  setQuery={setQuery}
                  categoryId={categoryId}
                  setCategoryId={setCategoryId}
                  favoritesOnly={favoritesOnly}
                  setFavoritesOnly={setFavoritesOnly}
                  filteredRecipes={filteredRecipes}
                  resetFilters={resetFilters}
                  deleteRecipe={deleteRecipe}
                  favoriteIds={favoriteIds}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route path="recipes/new" element={<AddRecipePage addRecipe={addRecipe} />} />
            <Route path="recipes/:id" element={<RecipeDetailPage recipes={recipes} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;







