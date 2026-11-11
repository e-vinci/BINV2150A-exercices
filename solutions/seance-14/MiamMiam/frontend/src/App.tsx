import { Button, Container, Modal } from "@mui/material";
import miamiam from "./assets/miammiam.png";
import { RecipeList } from "./components/RecipeList";
import { PageLayout } from "./components/PageLayout";
import { RecipeForm } from "./components/RecipeForm";
import { useState } from "react";
import { recipes as initialRecipes } from "./data/recipes";
import type { NewRecipe } from "./models/recipe";

const App = () => {
  const [open, setOpen] = useState(false);
  const [recipes, setRecipes] = useState(initialRecipes);

  // MODAL
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // FORM
  const addRecipe = (recipe: NewRecipe) => {
    setRecipes((prev) => [
      ...prev,
      { id: Math.max(...recipes.map((r) => r.id)) + 1, ...recipe, authorId: 1 },
    ]);
  };

  // CARD
  const deleteRecipe = (id: number) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  return (
    <>
      <PageLayout>
        <Container>
          <img
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            src={miamiam}
            alt="miamiam.png"
          />

          <Button
            sx={{ position: "fixed", translate: 25 }}
            variant="contained"
            onClick={handleOpen}
          >
            Add recept
          </Button>
        </Container>

        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: "flex",
            backdropFilter: "hue-rotate(160deg)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RecipeForm onAdd={addRecipe} />
        </Modal>

        <Container>
          <RecipeList recipes={recipes} onDelete={deleteRecipe} />
        </Container>
      </PageLayout>
    </>
  );
};

export default App;
