import { RecipeCard, type RecipeCardProps } from "./RecipeCard"

const recipes: RecipeCardProps[] = [
    {
        title: "Spaghetti Carbonara",
        imageUrl: "/images/carbonara.jpg",
        duration: 30,
        difficulty: "Facile",
        description: "Un grand classique italien crémeux et savoureux."
    },
    {
        title: "Poulet au curry",
        imageUrl: "/images/poulet-curry.jpg",
        duration: 45,
        difficulty: "Moyen",
        description: "Un poulet parfumé accompagné d'une sauce au curry."
    }
];


export const RecipeList = () => {
    return (
        <>
        {/**
         * Une boucle de RecipeCard
        */}
        {recipes.map((r, i) => (
            <RecipeCard key={i} {...r}/>
        ))}
        </>
    )
}