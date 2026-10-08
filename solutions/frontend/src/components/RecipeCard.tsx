const recipe = {
    title: "Pâtes Carbonara",
    imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800",
    duration: 20,
    difficulty: "Facile",
};





const RecipeCard = () => {
return (
    <div className="recipe-card">
    <h2>Pâtes Carbonara </h2>
    <img
        src={recipe.imageUrl}
        alt={recipe.title}
        style={{ width: "200px", height: "150px", objectFit: "cover" }}
    />
    <p>
    <strong>Durée: </strong> {recipe.duration} minutes
    </p>
    <p>
    <strong>Difficulté: </strong> {recipe.difficulty}
    </p>
    <p>
    <strong>Ingrédients: </strong> Pâtes, œufs, lard, fromage
    </p>
    </div>
    )
};

export default RecipeCard;




