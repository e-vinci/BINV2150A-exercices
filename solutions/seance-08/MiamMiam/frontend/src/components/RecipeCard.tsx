export interface RecipeCardProps {
    title : string, 
    imageUrl : string,
    duration : number,
    difficulty : number,
    description? : string,
};

const RecipeCard = (props : RecipeCardProps) => {
    return (
        <div className="recipe-card">
            <h2>{props.title}</h2>
            <img src={props.imageUrl} alt={props.title} style={{width:"400px", height:"250px", objectFit:"cover"}} />
            <p>{props.duration} min</p>
            <p>{props.difficulty}/5</p>
            {props.description &&<p>{props.description}</p>}
        </div>
    );   
};

export default RecipeCard;