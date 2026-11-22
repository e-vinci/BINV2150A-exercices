import { Grid, Stack } from "@mui/material";
import RecipeCard from "./RecipeCard"

const RecipeList = () =>{
    return (
        <Grid container spacing={2}>
            <Grid size={{xs:12, sm:6, md:4}}>
            <RecipeCard title="Pancakes moelleux"
            imageUrl="https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800"
            duration={10}
            difficulty={1}
            category="Entrée"/>
            </Grid>
            
            <Grid size={{xs:12, sm:6, md:4}}>
            <RecipeCard title="Spaghetti carbonara"
            imageUrl="https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800"
            duration={10}
            difficulty={2}
            description="La vraie carbonara : guanciale, pecorino, oeufs et poivre. Pas de crème !"
             category="Plat"/>
            </Grid>

            <Grid size={{xs:12, sm:6, md:4}}>
            <RecipeCard title="Soupe de potiron"
            imageUrl="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800"
            duration={15}
            difficulty={1}
            description="Un velouté d'automne tout doux, parfait avec des croûtons."
            category="Dessert"/>
            </Grid>
        </Grid>
    )
}

export default RecipeList;