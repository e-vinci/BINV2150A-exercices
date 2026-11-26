import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { AddRecipePage } from "./pages/AddRecipePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RecipeDetailsPage } from "./pages/RecipeDetailPage";
import { useRecipes } from "./hooks/useRecipes";
import { useFavorites } from "./hooks/useFavorites";

const App = () => {
  const { recipes, addRecipe, deleteRecipe } = useRecipes();
  const { favorites, toggleFavorite } = useFavorites();

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
                toggleFavorite={toggleFavorite}
              />
            }
          ></Route>
          <Route
            path="/recipes/new"
            element={<AddRecipePage addRecipe={addRecipe} />}
          ></Route>

          <Route
            path="/recipes/:id"
            element={
              <RecipeDetailsPage recipes={recipes} onDelete={deleteRecipe} />
            }
          ></Route>

          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
