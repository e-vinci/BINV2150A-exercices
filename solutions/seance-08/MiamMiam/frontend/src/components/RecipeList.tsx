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
    },
    {
        title: "Tarte aux pommes",
        imageUrl: "/images/tarte-pommes.jpg",
        duration: 60,
        difficulty: "Facile",
        description: "Une tarte aux pommes maison, simple et gourmande."
    },
    {
        title: "Risotto aux champignons",
        imageUrl: "/images/risotto.jpg",
        duration: 40,
        difficulty: "Moyen"
    }
];


export const RecipeList = () => {
    return (
        <>
        {recipes.map((r, i) => (
            <RecipeCard key={i} {...r}/>
        ))}
        </>
    )
}