import { Link, useNavigate, useParams } from "react-router";
import { RecipeDetail } from "../components/RecipeDetail";
import type { Recipe } from "../models/recipe";
import { Button, Container, Typography } from "@mui/material";

interface RecipeDetailsPageProps {
  recipes: Recipe[];
  onDelete: (id: number) => void;
}

export const RecipeDetailsPage = ({
  recipes,
  onDelete,
}: RecipeDetailsPageProps) => {
  const { id } = useParams();
  const recipeId = Number(id);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const deleteRecipe = () => {
    onDelete(recipeId);
    navigate("/", { replace: true });
  };

  const recipe = recipes.find((r) => r.id === recipeId);
  if (!recipe) {
    return (
      <>
        <Typography>Recette introuvable.</Typography>
        <Button variant="contained" component={Link} to={"/"}>
          Retour à la liste
        </Button>
      </>
    );
  }

  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      <Button variant="contained" onClick={goBack}>
        Retour
      </Button>
      <RecipeDetail {...recipe} />
      <Button variant="contained" onClick={deleteRecipe}>
        Suprrimer
      </Button>
    </Container>
  );
};
