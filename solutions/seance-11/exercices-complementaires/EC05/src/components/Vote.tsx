import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react"

const Vote = () =>{
   const [countPour, setCountPour] = useState(0);
   const [countContre, setCountContre] = useState(0);

    const pour = () => {
        setCountPour( (prev) => prev+1);
    }
    const contre = () => {
        setCountContre( (prev) => prev+1);
    }
    const total = countPour + countContre;
    return(
        <Stack direction="column">
            <Stack direction="row">
                <Button onClick={pour}>
                    Pour
                </Button>

                <Typography>
                    {countPour}
                </Typography>

                <Button onClick={contre}>
                    Contre
                </Button>
                <Typography>
                    {countContre}
                </Typography>

            </Stack>
            <Typography sx={{color:"green"}}>
                Total des votes : {total}
            </Typography>
            

            <Typography sx={{color:"red"}}>
                Pourcentages de vote "Pour" : { total==0?0 : Math.round((countPour/total)*1000)/10}%
            </Typography>
        </Stack>
    );
};
export default Vote;