
import { Button, Checkbox, createTheme, CssBaseline, FormControlLabel, ThemeProvider, Typography } from "@mui/material"
import { useState } from 'react';
import { recipes as initialRecipes } from './data/recipes';
import type { NewRecipe, Recipe } from './models/recipe';
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AddRecipePage from "./pages/AddRecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useSearchParams } from "react-router";


const theme = createTheme({
  palette: {
    primary: { main: "#e65100" },
  },
})


const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes)
  // const [query, setQuery] = useState("");
  // const [categoryId, setCategoryId] = useState<number | null>(null);


  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("search") ?? "";

  const categoryParam = searchParams.get("category");
  const categoryId =
    categoryParam !== null && !Number.isNaN(Number(categoryParam))
      ? Number(categoryParam)
      : null;


  const updateFilters = (newQuery: string, newCategoryId: number | null) => {
    const params: Record<string, string> = {};
    if (newQuery !== "") params.search = newQuery;
    if (newCategoryId !== null) params.category = String(newCategoryId);
    setSearchParams(params, { replace: true });
  };

  const handleSearch = (value: string) => updateFilters(value, categoryId);
  const handleCategory = (id: number | null) => updateFilters(query, id);

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

  const addRecipe = (newRecipe: NewRecipe): number => {
    const id = Date.now();
    const recipe: Recipe = { ...newRecipe, id, authorId: 1 };
    setRecipes([...recipes, recipe]);
    return id;
  };

  const deleteRecipe = (id: number) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };



  const resetFilters = () => {
    // setQuery("");
    // setCategoryId(null);
    // setFavoritesOnly(false);
    setSearchParams({});
    setFavoritesOnly(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

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
                setQuery={handleSearch}
                categoryId={categoryId}
                setCategoryId={handleCategory}
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
          <Route path="recipes/:id" element={<RecipeDetailPage recipes={recipes} onDelete={deleteRecipe} />} />
          <Route path="*" element={<NotFoundPage />} />

        </Route>
      </Routes>

    </ThemeProvider>
  );
};
export default App;







