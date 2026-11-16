const recipe  = {
    title: "Pâtes Carbonara",
    imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800",
    duration: 20,
    difficulty: "Facile",
};

const RecipeCard = () => {
    return (
        <div className="recipe-card">
            <h2>{recipe.title}</h2>
            <img src={recipe.imageUrl} alt={recipe.title} style={{width:"400px", height:"250px", objectFit:"cover"}} />
            <p>{recipe.duration} min</p>
            <p>{recipe.difficulty}</p>
        </div>
    );   
};

export default RecipeCard;