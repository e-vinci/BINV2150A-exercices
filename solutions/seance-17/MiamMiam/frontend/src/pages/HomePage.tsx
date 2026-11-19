import { useState } from "react";
import { Button, Chip, Container, Stack, Typography } from "@mui/material";
import miamiam from "../assets/miammiam.png";
import { CategoryFilter } from "../components/CategoryFilter";
import { SearchBar } from "../components/SearchBar";
import { RecipeList } from "../components/RecipeList";
import type { Recipe } from "../models/recipe";
import { useSearchParams } from "react-router";

interface HomePageProps {
  recipes: Recipe[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

export const HomePage = ({
  recipes,
  favorites,
  toggleFavorite,
}: HomePageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") ?? "");

  const paramsCatId = searchParams.get("category");
  const [categoryId, setCategoryId] = useState<number | null>(
    Number(paramsCatId) || null,
  );

  const [onlyFavorite, setOnlyFavorite] = useState(false);

  // SEARCHBAR
  const changeQuery = (q: string) => {
    setQuery(q);
    setSearchParams({ search: q });
  };

  const clearQueryAndCategoryAndFavorite = () => (
    setQuery(""),
    setCategoryId(null),
    setOnlyFavorite(false),
    setSearchParams({
      search: "",
      category: "",
    })
  );

  // CATFILTER
  const selectCategory = (categoryId: number | null) => {
    setCategoryId(categoryId);
    setSearchParams({ category: categoryId + "" });
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const text = `${recipe.title} ${recipe.description}`.toLowerCase();
    if (categoryId !== null && recipe.categoryId !== categoryId) return false;
    if (!text.includes(query.toLowerCase())) return false;
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
            favorites={favorites}
            onToggle={toggleFavorite}
          />
        ) : (
          <Button
            variant="contained"
            onClick={clearQueryAndCategoryAndFavorite}
          >
            Réinitialiser les filtres
          </Button>
        )}
      </Container>
    </>
  );
};
