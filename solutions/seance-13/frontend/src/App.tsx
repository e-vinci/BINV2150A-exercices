import { useState } from "react";
import PageLayout from './components/PageLayout';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import {createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { recipes as initialRecipes } from "./data/recipes";
import type { Recipe } from "./models/recipe";

const theme = createTheme({
  palette : {
    primary : { main : "#e65100"},
  },
})


const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);

  const addRecipe = (recipe: Recipe) => {
    setRecipes((currentRecipes) => [...currentRecipes, recipe]);
  };

  const deleteRecipe = (id: number) => {
    setRecipes((currentRecipes) => currentRecipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <ThemeProvider theme = {theme}>
      <CssBaseline />
      <PageLayout title="MiamMiam">
        <RecipeForm onRecipeCreated={addRecipe} />
        <RecipeList recipes={recipes} onDeleteRecipe={deleteRecipe} />
      </PageLayout>
    </ThemeProvider>
  );
};
export default App;






