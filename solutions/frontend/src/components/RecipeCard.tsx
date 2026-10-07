interface RecipeCardProps{
    title: string;
    description?: string;
    imageUrl: string;
    duration: number;
    difficulty: number;
}


export const RecipeCard = ({title, description, imageUrl, duration, difficulty}: RecipeCardProps) => {
    return(
        <div className = "recipe-card">
        <h1>{title}</h1>
        {description && <p style={{ fontStyle: "italic"}}>{description}</p>}
        <img src={imageUrl} />
        <p>Durée: {duration}min</p>
        <p>Difficulté: {difficulty}/5</p>
        </div>
    );
}