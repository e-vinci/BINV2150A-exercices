import { useState } from "react";
import { recipes as initialRecipes } from "../data/recipes";
import type { NewRecipe } from "../models/recipe";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState(initialRecipes);

  const addRecipe = (recipe: NewRecipe) => {
    const id = Math.max(...recipes.map((r) => r.id)) + 1;
    setRecipes((prev) => [...prev, { id, ...recipe, authorId: 1 }]);
    return id;
  };

  const deleteRecipe = (id: number) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  return {
    recipes,
    addRecipe,
    deleteRecipe,
  };
};
