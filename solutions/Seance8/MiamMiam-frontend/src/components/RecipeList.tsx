//exo3)
//Cration d'un composant RecipeList 
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
    return (
        <div className="recipe-list">
            <RecipeCard
                title="Pâtes Carbonara"
                imageUrl="https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800"
                duration={20}
                difficulty={2}
                description="Un grand classique italien crémeux et rapide à préparer."
            />
            <RecipeCard
                title="Mousse au chocolat"
                imageUrl="https://images.unsplash.com/photo-1541784533868-e042c1157692?w=800"
                duration={25}
                difficulty={3}
            />
            <RecipeCard
                title="Guacamole"
                imageUrl="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800"
                duration={10}
                difficulty={1}
                description="Idéal pour l'apéritif, à déguster avec des tortillas."
            />
        </div>
    );
};

export default RecipeList;