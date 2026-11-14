import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { AddRecipePage } from "./pages/AddRecipePage";
import { useState } from "react";
import { recipes as initialRecipes } from "./data/recipes";
import type { NewRecipe } from "./models/recipe";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RecipeDetailsPage } from "./pages/RecipeDetailPage";

const App = () => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [favorites, setFavorites] = useState<number[]>([]);

  // RECIPES
  const addRecipe = (recipe: NewRecipe) => {
    setRecipes((prev) => [
      ...prev,
      { id: Math.max(...recipes.map((r) => r.id)) + 1, ...recipe, authorId: 1 },
    ]);
  };

  const deleteRecipe = (id: number) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  // FAVORITES
  const addFavorite = (id: number) => setFavorites((prev) => [...prev, id]);
  const removeFavorite = (id: number) =>
    setFavorites(favorites.filter((i) => i !== id));

  const toggleFavorite = (id: number) =>
    favorites.some((f) => f === id) ? removeFavorite(id) : addFavorite(id);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <HomePage
                recipes={recipes}
                favorites={favorites}
                deleteRecipe={deleteRecipe}
                toggleFavorite={toggleFavorite}
              />
            }
          ></Route>
          <Route
            path="/recipes/new"
            element={<AddRecipePage addRecipe={addRecipe} />}
          ></Route>

          <Route path="/recipes/:id" element={<RecipeDetailsPage />}></Route>

          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
