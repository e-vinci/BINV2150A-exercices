import RecipeForm from "../components/RecipeForm";
import type { NewRecipe } from "../models/recipe";

interface AddRecipePageProps{
    addRecipe: (newRecipe : NewRecipe) => void;
};

const AddRecipePage = ({ addRecipe } : AddRecipePageProps) =>{
    return <RecipeForm onAdd= {addRecipe} />
}

export default AddRecipePage

