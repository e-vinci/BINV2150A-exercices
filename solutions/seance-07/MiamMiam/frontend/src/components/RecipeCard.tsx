const recipe = {
title: "Pâtes Carbonara",
imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800",
duration: 20,
difficulty: "Facile",
};


export const RecipeCard = () => {
    return <>
        <h2>{recipe.title}</h2>
        <img src={recipe.imageUrl} alt="recipe img" />
        <p>{recipe.duration}</p>
        <p>{recipe.difficulty}</p>
    </>
}