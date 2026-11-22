import { Button, Card, CardActions, CardContent, CardMedia, Chip, Rating, Typography } from "@mui/material";

export interface RecipeCardProps {
    title : string, 
    imageUrl : string,
    duration : number,
    difficulty : number,
    description? : string,
    category : string,
};

const RecipeCard = (props : RecipeCardProps) => {
    return (
        <Card>
            <CardMedia component="img" height="200" image={props.imageUrl} alt={props.title}></CardMedia>
            <CardContent>
                <Typography variant="h6" component="h2">{props.title}</Typography>
                <Typography variant="body1" >{props.duration} min</Typography>
                <Rating value={props.difficulty} max={5} readOnly></Rating>
                {props.description &&<Typography variant="body2" >{props.description}</Typography>}
                <Chip label={props.category} color="primary" size="small"></Chip>
            </CardContent>
            <CardActions>
                <Button size="small">Voir la recette</Button>
            </CardActions>
        </Card>
            
    );   
};

export default RecipeCard;