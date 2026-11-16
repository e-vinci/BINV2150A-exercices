import { useNavigate } from "react-router";
import { RecipeForm } from "../components/RecipeForm";
import type { NewRecipe } from "../models/recipe";
import { Button } from "@mui/material";

interface AddRecipePageProps {
  addRecipe: (recipe: NewRecipe) => number;
}

export const AddRecipePage = ({ addRecipe }: AddRecipePageProps) => {
  const navigate = useNavigate();

  return (
    <>
      <RecipeForm onAdd={addRecipe}></RecipeForm>
      <Button sx={{ mt: 4 }} onClick={() => navigate(-1)}>
        Annuler
      </Button>
    </>
  );
};
