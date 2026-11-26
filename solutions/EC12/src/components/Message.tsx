import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Message = () => {
    
    const [panier, setPanier] = useState<number>(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if(panier === 0) {
            return;
        }
        const timeoutId = setTimeout(() => {
            setMessage("");
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, [panier])
    return (
        <>
        <Button onClick={() => {setPanier((prev) => prev + 1), setMessage("Article ajouté");}}> Ajouter au panier </Button>
        {message !== "" && (
            <Typography> {message} </Typography>
        )}
        </>
    )
} 

export default Message;