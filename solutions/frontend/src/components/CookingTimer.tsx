import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";

interface CookingTimerProps {
  durationMinutes: number;
}

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const CookingTimer = ({ durationMinutes }: CookingTimerProps) => {
  const totalSeconds = durationMinutes * 60;
  const [remaining, setRemaining] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const isFinished = remaining === 0;
  const isActive = isRunning && !isFinished;

  useEffect(() => {
    if (!isActive) return;

    const intervalId = setInterval(() => {
      setRemaining((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive]);

  const handleReset = () => {
    setIsRunning(false);
    setRemaining(totalSeconds);
  };

  return (
    <>
      <Typography variant="h4">{formatTime(remaining)}</Typography>
      {isFinished && <Typography>Terminé !</Typography>}
      <Button onClick={() => setIsRunning((prev) => !prev)} disabled={isFinished}>
        {isActive ? "Pause" : "Démarrer"}
      </Button>
      <Button onClick={handleReset}>Réinitialiser</Button>
    </>
  );
};

export default CookingTimer;