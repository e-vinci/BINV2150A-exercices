import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  return (
    <div className="recipe-list">
      <RecipeCard
        title="Spaghetti carbonara"
        imageUrl="https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800"
        duration={25}
        difficulty={2}
        description="La vraie carbonara : guanciale, pecorino, oeufs et poivre. Pas de crème !"
      />
      <RecipeCard
        title="Mousse au chocolat"
        imageUrl="https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=800"
        duration={20}
        difficulty={3}
        description="Trois ingrédients, un résultat bluffant. À préparer la veille."
      />
      <RecipeCard
        title="Guacamole"
        imageUrl="https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=800"
        duration={10}
        difficulty={1}
      />
    </div>
  );
};

export default RecipeList;