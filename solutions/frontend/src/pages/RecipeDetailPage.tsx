
import RecipeDetail from "../components/RecipeDetail";
import type { Recipe } from "../models/recipe";
import { Link, useNavigate, useParams } from "react-router";
import { Button, Typography } from "@mui/material";

interface RecipeDetailPageProps {
    recipes: Recipe[];
}
interface RecipeDetailPageProps {
  recipes: Recipe[];
  onDelete: (id: number) => void;
}

const RecipeDetailPage = ({ recipes,onDelete }: RecipeDetailPageProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const recipe = recipes.find((r) => r.id === Number(id));

    

    if (!recipe) {
        return (
            <>
                <Typography>Recette introuvable.</Typography>;
                <Button component={Link} to="/">Retour aux recettes</Button>
            </>

        )
    }
    const handleDelete = () =>{
        onDelete(recipe.id);

    }

    return (
        <>
            <Button onClick={() => navigate(-1)}>Retour</Button>
            <RecipeDetail recipe={recipe} />;
            <Button color="error" onClick={handleDelete}>Suprimer</Button>
        </>

    )

};

export default RecipeDetailPage