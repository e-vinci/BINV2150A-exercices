
import { createTheme, CssBaseline, ThemeProvider} from "@mui/material"
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AddRecipePage from "./pages/AddRecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useSearchParams } from "react-router";
import { useFavorites } from "./hooks/useFavorites";
import { useRecipes } from "./hooks/useRecipes";
import { useDebouncedValue } from "./hooks/useDebouncedValue";


const theme = createTheme({
  palette: {
    primary: { main: "#e65100" },
  },
})

const App = () => {
  
  
  const {favoritesOnly,favoriteIds,setFavoritesOnly, toggleFavorite} = useFavorites();
  const {recipes, addRecipe, deleteRecipe} = useRecipes();

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("search") ?? "";
  const debouncedQuery = useDebouncedValue(query, 300);

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


  const filteredRecipes = recipes.filter((recipe) => {
    const text = `${recipe.title} ${recipe.description}`.toLowerCase();
    if (!text.includes(debouncedQuery.toLowerCase())) return false;
    if (categoryId !== null && recipe.categoryId !== categoryId) return false;
    if (favoritesOnly && !favoriteIds.includes(recipe.id)) return false;
    return true;
  });

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
                debouncedQuery = {debouncedQuery}
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







