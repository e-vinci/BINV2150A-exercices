import { RecipeCard } from "./RecipeCard";



export const RecipeList = (()=>{
    return(
        <div className="recipe-list">
        <RecipeCard 
            title="Pancakes moelleux"
            description="Des pancakes épais et aérés pour un brunch réussi."
            imageUrl="https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800"
            duration={10}
            difficulty={1}
        />
        <RecipeCard 
            title="Spaghetti carbonara"
            description="La vraie carbonara : guanciale, pecorino, oeufs et poivre. Pas de crème !"
            imageUrl= "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800"
            duration={10}
            difficulty={2}
        />
        <RecipeCard 
            title= "Soupe de potiron"
            description= "Un velouté d'automne tout doux, parfait avec des croûtons."
            imageUrl= "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800"
            duration= {15}
            difficulty= {1}
        />
        </div>
    )
});