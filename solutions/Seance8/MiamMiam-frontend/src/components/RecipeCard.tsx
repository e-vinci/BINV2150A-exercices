//Exo1)////
// remplacement de l’objet recipe par des props typées avec une interfaceRecipeCardProps
interface RecipeCardProps {
    title: string;
    imageUrl: string;
    duration: number;
    difficulty: number;
    //Exo2)//
    //Ajoutez une prop optionnelle description
    description?: string; // nombre de 1 à 5
}
//exo1)
const RecipeCard = ({ title, imageUrl, duration, difficulty,description }: RecipeCardProps) => {
    return (
        
        <div className="recipe-card">
            <h2>{title}</h2>
            <img
                src={imageUrl}
                alt={title}
                style={{ width: "200px", height: "150px", objectFit: "cover" }}
            />
            {/* Exo2
            grâce à l'opérateur &&, le paragraphe 
             n'est rendu que si description est fournie.
              Si elle est absente ou vide, React n'affiche rien.
            */}
            {description && <p>{description}</p>}
            <p>
                Durée : {duration} minutes
            </p>
            <p>
                Difficulté : {difficulty}/5
            </p>
        </div>
    );
};

export default RecipeCard;