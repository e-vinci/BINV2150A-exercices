const BEST_SCORE_KEY = "ec13-best-score";

export const loadBestScore = (): number => {
  const raw = localStorage.getItem(BEST_SCORE_KEY);
  const value = raw === null ? 0 : Number(raw);
  return Number.isNaN(value) ? 0 : value;
};

export const saveBestScore = (score: number) => {
  localStorage.setItem(BEST_SCORE_KEY, String(score));
};