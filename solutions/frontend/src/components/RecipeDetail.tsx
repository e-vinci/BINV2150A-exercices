import type {Recipe} from "../models/recipe";

interface RecipeDetailProps{
    recipe : Recipe;
}

const RecipeDetail = ({recipe} : RecipeDetailProps) => {
    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <p>Préparation : {recipe.prepTime} min</p>
            <p>Cuisson : {recipe.cookTime} min</p>
            <p>Portions : {recipe.servings}</p>
            <h2>Ingrédients</h2>
            <ul>
                {recipe.ingredients.map((ingredient) =>(
                    <li key = {ingredient.name}>
                        {ingredient.quantity} {ingredient.unit} de {ingredient.name}
                    </li>
                ))}
            </ul>
            
            <h2>Étapes</h2>
            <ol>
                {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    )
}

export default RecipeDetail