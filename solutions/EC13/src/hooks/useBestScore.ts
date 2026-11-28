import { useState } from "react";
import { loadBestScore, saveBestScore } from "../utils/storage";

export const useBestScore = () => {
  const [bestScore, setBestScore] = useState(() => loadBestScore());

  const submitScore = (score: number) => {
    if (score <= bestScore) return; // pas un record : on ne fait rien
    setBestScore(score);
    saveBestScore(score);
  };

  return { bestScore, submitScore };
};