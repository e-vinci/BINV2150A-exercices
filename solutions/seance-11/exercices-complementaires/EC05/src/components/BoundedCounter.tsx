import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

const BoudedCouter = () => {
    const [count,setCount] = useState(0);

    const increment = () => {
        setCount( (prev) => prev+1)
    }
    const decrement = () => {
        setCount( (prev) => prev-1)
    }
    const reset = () => {
        setCount(0);
    }

    return(
        <Stack direction="row">
        <Button onClick={increment} disabled={count>=10}>
            Ajouter
        </Button>
        <Typography variant="h5" component="h2">{count}</Typography>
        <Button onClick={decrement} disabled={count<=0}>
            Retirer
        </Button>

        <Button onClick={reset} disabled={count===0}>
            Remettre à 0
        </Button>
        </Stack>
    )

}
export default BoudedCouter;