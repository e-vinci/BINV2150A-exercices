import { Button, Stack,Typography } from "@mui/material";
import { useState } from "react"

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false)

    const handleClick = () => setIsDark( (prev) => !prev);

    return(
    <Stack sx={{backgroundColor: isDark?"black":"white", color: isDark? "white" : "black"}}>
        <Button onClick={handleClick}>
            {isDark ? "Passer au thème clair" : "Passer au thème sombre"}
        </Button>
        <Typography>
            {isDark ? "Le thème appliqué est : Dark" : "Le thème appliqué est : White"}
        </Typography>
    </Stack>
    );
};
export default ThemeToggle;