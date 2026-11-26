import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Horloge = () => {

    const [heureActuelle, setHeureActuelle] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setHeureActuelle(new Date());
            console.log("Horloge actualisée");
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Stack spacing={3}>
            <Typography> Horloge : {heureActuelle.toLocaleTimeString()} </Typography> 
        </Stack>
    );
}

export default Horloge;