import RecipeCard from "./RecipeCard";

const RecipeList = () => {
return (
    <div>
        <RecipeCard
            title="Pancakes moelleux"
            imageUrl="https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800"
            duration={15}
            difficulty={1}
        />
        <RecipeCard 
            title="Spaghetti carbonara"
            imageUrl="https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800"
            duration={15}
            difficulty={2}
        />
        <RecipeCard 
            title="Soupe de potiron"
            imageUrl="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800"
            duration={30}
            difficulty={1}
        />
    </div>
    )
};

export default RecipeList