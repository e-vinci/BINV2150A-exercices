import { RecipeForm } from "../components/RecipeForm";
import type { NewRecipe } from "../models/recipe";

interface AddRecipePageProps {
  addRecipe: (recipe: NewRecipe) => void;
}

export const AddRecipePage = ({ addRecipe }: AddRecipePageProps) => {
  return (
    <>
      <RecipeForm onAdd={addRecipe}></RecipeForm>
    </>
  );
};
