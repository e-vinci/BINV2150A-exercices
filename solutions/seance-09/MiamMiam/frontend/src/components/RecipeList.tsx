import { Grid } from "@mui/material";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <RecipeCard
          title="Spaghetti carbonara"
          imageUrl="https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800"
          duration={25}
          difficulty={2}
          category="Plat"
          description="La vraie carbonara : guanciale, pecorino, oeufs et poivre. Pas de crème !"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <RecipeCard
          title="Mousse au chocolat"
          imageUrl="https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=800"
          duration={20}
          difficulty={3}
          category="Dessert"
          description="Trois ingrédients, un résultat bluffant. À préparer la veille."
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <RecipeCard
          title="Guacamole"
          imageUrl="https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=800"
          duration={10}
          difficulty={1}
          category="Apéro"
        />
      </Grid>
    </Grid>
  );
};

export default RecipeList;