import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Stack from "@mui/material/Stack";

export const Vote = () => {
  const [votesPour, setVotesPour] = useState(0);
  const [votesContre, setVotesContre] = useState(0);

  const totalVotes = votesPour + votesContre;
  const ratio = (votesPour / totalVotes) * 100;

  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 2,
        }}
      >
        <Typography>Pour</Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: 2,
          }}
        >
          <IconButton
            onClick={() => setVotesPour((prev) => prev - 1)}
            disabled={votesPour <= 0}
          >
            <RemoveIcon />
          </IconButton>
          <Typography>{votesPour}</Typography>
          <IconButton onClick={() => setVotesPour((prev) => prev + 1)}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={() => setVotesPour(0)}>
            <RestartAltIcon />
          </IconButton>
        </Stack>

        <Typography>Contre</Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: 2,
          }}
        >
          <IconButton
            onClick={() => setVotesContre((prev) => prev - 1)}
            disabled={votesContre <= 0}
          >
            <RemoveIcon />
          </IconButton>
          <Typography>{votesContre}</Typography>
          <IconButton onClick={() => setVotesContre((prev) => prev + 1)}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={() => setVotesContre(0)}>
            <RestartAltIcon />
          </IconButton>
        </Stack>

        <Typography>Le total des votes = {totalVotes}</Typography>
        <Typography>
          Pour : {totalVotes > 0 ? ratio.toFixed(1) : 0} %
        </Typography>
      </CardContent>
    </Card>
  );
};
