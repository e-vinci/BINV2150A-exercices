import { RecipeDetail } from "../components/RecipeDetail";

import { recipes } from "../data/recipes";

export const RecipeDetailsPage = () => {
  return (
    <>
      <RecipeDetail {...recipes[0]} />
    </>
  );
};
