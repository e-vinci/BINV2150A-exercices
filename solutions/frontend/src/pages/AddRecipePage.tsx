import { useNavigate } from "react-router";
import RecipeForm from "../components/RecipeForm";
import type { NewRecipe } from "../models/recipe";
import { Button } from "@mui/material";

interface AddRecipePageProps {
    addRecipe: (newRecipe: NewRecipe) => number;
};

const AddRecipePage = ({ addRecipe }: AddRecipePageProps) => {
    const navigate = useNavigate();

    const handleAdd = (newRecipe: NewRecipe): number => {
        const id = addRecipe(newRecipe);
        navigate(`/recipes/${id}`);
        return id;
    }
    return <>
        <RecipeForm onAdd={addRecipe} />
        <Button onClick = {() => navigate(-1)}>Annuler</Button>
    </>
}

export default AddRecipePage

