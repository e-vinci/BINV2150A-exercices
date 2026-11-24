
interface RecipeCardProps {
    title : string,
    imageUrl : string,
    description ?: string,
    duration : number,
    difficulty : number
}





const RecipeCard = ({ title, imageUrl,description = "Pas de description" ,duration, difficulty }: RecipeCardProps) => {
return (
    <div className="recipe-card">
    
    <h2>{title} </h2>
    <p>{description} </p>
    <img src={imageUrl} alt={title} />
    <p>Durée : {duration} minutes </p>
    <p>Difficulté : {difficulty}/5 </p>
    </div>
    )
};

export default RecipeCard;




