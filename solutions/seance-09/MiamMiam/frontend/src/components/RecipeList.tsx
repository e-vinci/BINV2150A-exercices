import { Grid } from "@mui/material";
import { RecipeCard, type RecipeCardProps } from "./RecipeCard";

const recipes: RecipeCardProps[] = [
  {
    title: "Spaghetti Carbonara",
    imageUrl:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
    duration: 9,
    difficulty: 8,
    description: "Un grand classique italien crémeux et savoureux.",
  },
  {
    title: "Poulet au curry",
    imageUrl:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
    duration: 45,
    difficulty: 5,
    description: "Un poulet parfumé accompagné d'une sauce au curry.",
  },
  {
    title: "Pate",
    imageUrl:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
    duration: 30,
    difficulty: 4,
    description: "Une super recette de pates",
    category: "dinner",
  },
  {
    title: "Pate",
    imageUrl:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
    duration: 30,
    difficulty: 4,
    description: "Une super recette de pates",
    category: "dinner",
  },
  {
    title: "Pate",
    imageUrl:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
    duration: 30,
    difficulty: 4,
    description: "Une super recette de pates",
    category: "dinner",
  },
  {
    title: "Pate",
    imageUrl:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
    duration: 30,
    difficulty: 4,
    description: "Une super recette de pates",
    category: "dinner",
  },
  {
    title: "Pate",
    imageUrl:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
    duration: 30,
    difficulty: 4,
    description: "Une super recette de pates",
    category: "dinner",
  },
];

export const RecipeList = () => {
  return (
    <>
      <Grid container spacing={2}>
        {recipes.map((r, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <RecipeCard key={i} {...r} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
