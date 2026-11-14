import { useState } from "react";
import { Button, Chip, Container, Stack, Typography } from "@mui/material";
import miamiam from "../assets/miammiam.png";
import { CategoryFilter } from "../components/CategoryFilter";
import { SearchBar } from "../components/SearchBar";
import { RecipeList } from "../components/RecipeList";
import type { Recipe } from "../models/recipe";

interface HomePageProps {
  recipes: Recipe[];
  favorites: number[];
  deleteRecipe: (id: number) => void;
  toggleFavorite: (id: number) => void;
}

export const HomePage = ({
  recipes,
  favorites,
  deleteRecipe,
  toggleFavorite,
}: HomePageProps) => {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [onlyFavorite, setOnlyFavorite] = useState(false);

  // SEARCHBAR
  const changeQuery = (q: string) => setQuery(q);
  const clearQueryAndCategory = () => (setQuery(""), setCategoryId(null));

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
      </Container>

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
          <Button variant="contained" onClick={clearQueryAndCategory}>
            Réinitialiser les filtres
          </Button>
        )}
      </Container>
    </>
  );
};
