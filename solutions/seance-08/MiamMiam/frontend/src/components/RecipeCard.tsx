export interface RecipeCardProps{
    title : string,
    imageUrl: string,
    duration: number,
    difficulty: string,
    description?: string
}


export const RecipeCard = ({title, imageUrl, duration, difficulty, description} : RecipeCardProps) => {
    return <>
        <h2>{title}</h2>
        <img src={imageUrl} alt="recipe img" />
        {description && <p>{description}</p>}
        <p>{duration}</p>
        <p>{difficulty}</p>
    </>
}