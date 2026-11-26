import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface TimerProps {
  minutes: number;
}

export const Timer = ({ minutes }: TimerProps) => {
  const [seconds, setSeconds] = useState(() => minutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 0) return (setIsRunning(false), 0);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  return (
    <>
      <Card>
        <CardContent>
          <Stack direction={"row"} sx={{ alignItems: "center", gap: 3 }}>
            <Typography variant="h5">
              CookTime
              {" " +
                Math.floor(seconds / 60)
                  .toString()
                  .padStart(2, "0")}
              :{(seconds % 60).toString().padStart(2, "0")}
            </Typography>

            {seconds > 0 && (
              <Button
                variant="contained"
                onClick={() => setIsRunning((prev) => !prev)}
              >
                {isRunning ? "Pause" : "Démarrer"}
              </Button>
            )}

            {seconds != minutes * 60 && (
              <Button
                variant="contained"
                onClick={() => (setSeconds(minutes * 60), setIsRunning(false))}
              >
                Réinitialiser
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
