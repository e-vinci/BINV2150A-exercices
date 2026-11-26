import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Chronometre = () => {

    const [dixiemes, setDixiemes] = useState<number>(0);
    const [etatBouton, setEtatBouton] = useState<boolean>(false);
    const [listeTour, setListeTour] = useState<number[]>([]);

    useEffect(() => {
        if(etatBouton === false) {
            return;
        }

        const intervalId = setInterval(() => {
            setDixiemes((prev) => prev + 1)
        }, 100)
        return () => clearInterval(intervalId);
    }, [etatBouton])

    const minutes = Math.floor(dixiemes / 600);
    const secondes = Math.floor(dixiemes / 10) % 60;
    const resteDixiemes = dixiemes % 10;

    return (
        <Stack spacing={3}>
            <Typography> Chronomètre </Typography>
            <Typography> {minutes}:{secondes}:{resteDixiemes} </Typography>
            <Button onClick={() => setEtatBouton(true)}> Démarrer </Button>
            <Button onClick={() => setEtatBouton(false)}> Pause </Button>
            <Button onClick={() => {setEtatBouton(false), setDixiemes(0), setListeTour([])}}> Remise à zéro </Button>
            <Button onClick={() => setListeTour((prev) => [...prev, dixiemes])}> Tour </Button>
            {listeTour && (
                listeTour.map((t, indexOf) => 
                <Typography key={indexOf}> Tour : {Math.floor(t/600)}:{Math.floor(t / 10) % 60}:{t%10} </Typography>)
            )}
        </Stack>
    );
}

export default Chronometre;