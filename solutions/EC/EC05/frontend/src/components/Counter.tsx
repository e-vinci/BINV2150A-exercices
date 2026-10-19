import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 2,
        }}
      >
        <IconButton
          onClick={() => setCount((prev) => prev - 1)}
          disabled={count <= 0}
        >
          <RemoveIcon />
        </IconButton>
        <Typography>{count}</Typography>
        <IconButton
          onClick={() => setCount((prev) => prev + 1)}
          disabled={count >= 10}
        >
          <AddIcon />
        </IconButton>
        <IconButton onClick={() => setCount(0)}>
          <RestartAltIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};
