import {
  Button,
  Chip,
  Container,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AddIcon from "@mui/icons-material/Add";
import miamiam from "./assets/miammiam.png";
import { RecipeList } from "./components/RecipeList";
import { PageLayout } from "./components/PageLayout";
import { RecipeForm } from "./components/RecipeForm";
import { useState } from "react";
import { recipes as initialRecipes } from "./data/recipes";
import type { NewRecipe } from "./models/recipe";
import { SearchBar } from "./components/SearchBar";
import { CategoryFilter } from "./components/CategoryFilter";
import type { Recipe } from "./models/recipe";

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [onlyFavorite, setOnlyFavorite] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const addRecipe = (recipe: NewRecipe) => {
    setRecipes((prev) => {
      const lastId = prev.reduce((max, item) => Math.max(max, item.id), 0);
      return [...prev, { ...recipe, id: lastId + 1, authorId: 1 }];
    });
    setFormOpen(false);
  };

  const deleteRecipe = (id: number) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    setFavorites((prev) => prev.filter((favoriteId) => favoriteId !== id));
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favoriteId) => favoriteId !== id)
        : [...prev, id],
    );
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const searchText = `${recipe.title} ${recipe.description}`.toLocaleLowerCase();
    const matchesText = searchText.includes(query.trim().toLocaleLowerCase());
    const matchesCategory =
      categoryId === null || recipe.categoryId === categoryId;
    const matchesFavorite = !onlyFavorite || favorites.includes(recipe.id);

    return matchesText && matchesCategory && matchesFavorite;
  });

  return (
    <PageLayout favoriteCount={favorites.length}>
        <Container
          sx={{
            mt: 2,
            mb: 3,
            p: { xs: 2, sm: 4 },
            borderRadius: 4,
            background: "linear-gradient(120deg, #f8d7b2, #fff1df)",
          }}
        >
          <img
            style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: 16 }}
            src={miamiam}
            alt="Illustration de la cuisine MiamMiam"
          />

          <Button
            sx={{ mt: 2 }}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setFormOpen(true)}
          >
            Nouvelle recette
          </Button>
        </Container>

        <Modal
          open={formOpen}
          onClose={() => setFormOpen(false)}
          sx={{
            display: "flex",
            backdropFilter: "hue-rotate(160deg)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RecipeForm onAdd={addRecipe} />
        </Modal>

        <Container sx={{ mt: 4 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
            <RestaurantMenuIcon color="primary" />
            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
              Toutes nos recettes
            </Typography>
          </Stack>
          <CategoryFilter selectedId={categoryId} onSelect={setCategoryId} />
          <SearchBar value={query} onChange={setQuery} />
          <Typography variant="h6">
            {filteredRecipes.length} recette(s)
          </Typography>

          <Stack direction={"row"} spacing={2} sx={{ mb: 2 }}>
            <Chip
              label="Favoris uniquement"
              color={onlyFavorite ? "primary" : "default"}
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
            <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
              <Typography>Aucune recette ne correspond aux filtres.</Typography>
              <Button
                variant="contained"
                onClick={() => {
                  setQuery("");
                  setCategoryId(null);
                  setOnlyFavorite(false);
                }}
              >
                Réinitialiser les filtres
              </Button>
            </Stack>
          )}
        </Container>
      </PageLayout>
  );
};

export default App;
