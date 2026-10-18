interface RecipeCardProps {
    title: string;
    imageUrl: string;
    duration: number;
    difficulty: number;
    description?: string;
}

const RecipeCard = ({title, imageUrl, duration, difficulty, description}: RecipeCardProps) => {
  return (
    <div className="recipe-card">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <img src={imageUrl} alt={title} />
      <p>Durée : {duration} minutes</p>
      <p>Difficulté : {difficulty}/5</p>
    </div>
  );
};

export default RecipeCard;