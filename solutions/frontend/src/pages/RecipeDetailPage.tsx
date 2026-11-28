
import RecipeDetail from "../components/RecipeDetail";
import type { Recipe } from "../models/recipe";
import { Link, useNavigate, useParams } from "react-router";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import CookingTimer from "../components/CookingTimer";


interface RecipeDetailPageProps {
    recipes: Recipe[];
    onDelete: (id: number) => void;
}

const RecipeDetailPage = ({ recipes, onDelete }: RecipeDetailPageProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const recipe = recipes.find((r) => r.id === Number(id));
    const title = recipe?.title;

    useEffect(() => {
        if (!title) return;                         
        document.title = `${title} - MiamMiam`;
        return () => { document.title = "MiamMiam" };
    }, [title]);


    if (!recipe) {
        return (
            <>
                <Typography>Recette introuvable.</Typography>
                <Button component={Link} to="/">Retour aux recettes</Button>
            </>

        )
    }
    

    const handleDelete = () => {
        onDelete(recipe.id);

    }

    return (
        <>
            <Button onClick={() => navigate(-1)}>Retour</Button>
            <RecipeDetail recipe={recipe} />
            <CookingTimer key={recipe.id} durationMinutes={recipe.cookTime} />
            <Button color="error" onClick={handleDelete}>Suprimer</Button>
        </>

    )

};

export default RecipeDetailPage