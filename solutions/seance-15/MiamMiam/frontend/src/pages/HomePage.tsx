import { useState } from "react";
import type { NewRecipe } from "../models/recipe";
import { recipes as initialRecipes } from "../data/recipes";
import {
  Button,
  Chip,
  Container,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import miamiam from "./assets/miammiam.png";
import { RecipeForm } from "../components/RecipeForm";
import { CategoryFilter } from "../components/CategoryFilter";
import { SearchBar } from "../components/SearchBar";
import { RecipeList } from "../components/RecipeList";

export const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [recipes, setRecipes] = useState(initialRecipes);
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [onlyFavorite, setOnlyFavorite] = useState(false);

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

  // SEARCHBAR
  const changeQuery = (q: string) => setQuery(q);

  // CATFILTER
  const selectCategory = (categoryId: number | null) =>
    setCategoryId(categoryId);

  const filteredRecipes = recipes.filter((recipe) => {
    const text = `${recipe.title} ${recipe.description}`.toLowerCase();
    if (!text.includes(query.toLowerCase())) return false;
    if (categoryId !== null && recipe.categoryId !== categoryId) return false;
    // TO FILTER FAVORITES
    if (onlyFavorite && !favorites.some((f) => f === recipe.id)) return false;
    return true;
  });

  // FAVORITES
  const addFavorite = (id: number) => setFavorites((prev) => [...prev, id]);
  const removeFavorite = (id: number) =>
    setFavorites(favorites.filter((i) => i !== id));

  const toggleFavorite = (id: number) =>
    favorites.some((f) => f === id) ? removeFavorite(id) : addFavorite(id);

  return (
    <>
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
        <CategoryFilter selectedId={categoryId} onSelect={selectCategory} />
        <SearchBar value={query} onChange={changeQuery} />
        <Typography variant="h6">total : {filteredRecipes.length}</Typography>

        <Stack direction={"row"} spacing={2} sx={{ mb: 2 }}>
          <Typography variant="h6">
            favoris :{" "}
            {
              filteredRecipes.filter((r) => favorites.some((f) => f === r.id))
                .length
            }
          </Typography>

          <Chip
            label={!onlyFavorite ? "Favoris uniquement" : "Tous"}
            color={!onlyFavorite ? "primary" : "default"}
            onClick={() => setOnlyFavorite((prev) => !prev)}
          />
        </Stack>

        {filteredRecipes.length > 0 ? (
          <RecipeList
            recipes={filteredRecipes}
            onDelete={deleteRecipe}
            favorites={favorites}
            onToggle={toggleFavorite}
          />
        ) : (
          <Button
            variant="contained"
            onClick={() => (setQuery(""), setCategoryId(null))}
          >
            Réinitialiser les filtres
          </Button>
        )}
      </Container>
    </>
  );
};
