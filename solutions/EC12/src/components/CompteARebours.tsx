import { Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const CompteARebours = () => {
    
    const [seconde, setSeconde] = useState("");
    const [decompte, setDecompte] = useState(false);
  
    const secondeNumber = Number(seconde);
    
    const [compteARebours, setCompteARebours] = useState(0);

    useEffect(() => {
        if(compteARebours === 0 || decompte === false) {
            return
        }

        const intervalId = setInterval(() => {
            setCompteARebours((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    },[decompte, compteARebours]);

    useEffect(() => {
        if (compteARebours !== 0 || decompte === false) {
            return;
        }
        document.title = "Terminé !";
    }, [compteARebours, decompte]);
    
    return (
        <Stack>
            <Typography> Saisissez un nombre de secondes (entre 1 et 60) </Typography>
            <TextField label="Champs de texte" value={seconde} onChange={(event) => setSeconde(event.target.value)}></TextField>
            {seconde !== "" && (
                <Stack spacing={3}>
                    <Button onClick={() => {setCompteARebours(secondeNumber), setDecompte(true)}} disabled={!Number.isInteger(secondeNumber) || secondeNumber < 1 || secondeNumber > 60}> Démarrer le décompte </Button>
                    <Typography> Décompte : {compteARebours} </Typography>
                </Stack>
            )}
        </Stack>
    );
}

export default CompteARebours;