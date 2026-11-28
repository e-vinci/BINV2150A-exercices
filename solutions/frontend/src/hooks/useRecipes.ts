import {useState} from "react";
import { recipes as initialRecipes } from "../data/recipes";
import type { NewRecipe, Recipe } from "../models/recipe";

export const useRecipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes)

    const addRecipe = (newRecipe: NewRecipe): number => {
    const id = Date.now();
    const recipe: Recipe = { ...newRecipe, id, authorId: 1 };
    setRecipes([...recipes, recipe]);
    return id;
  };

  const deleteRecipe = (id: number) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  return {recipes, addRecipe, deleteRecipe}
}