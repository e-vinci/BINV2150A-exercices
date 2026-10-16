const recipe = {
  title: "Pâtes Carbonara",
  imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800",
  duration: 20,
  difficulty: "Facile",
};

const RecipeCard = () => {
  return (
    <div className="recipe-card">
      <h2>{recipe.title}</h2>
      <img src={recipe.imageUrl} alt={recipe.title} />
      <p>Durée : {recipe.duration} minutes</p>
      <p>Difficulté : {recipe.difficulty}</p>
    </div>
  );
};

export default RecipeCard;