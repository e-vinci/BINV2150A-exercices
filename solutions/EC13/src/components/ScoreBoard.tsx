interface ScoreBoardProps {
  score: number;
  total: number;
  bestScore: number;
  onRestart: () => void;
}

const ScoreBoard = ({ score, total, bestScore, onRestart }: ScoreBoardProps) => (
  <div>
    <h2>Terminé !</h2>
    <p>Ton score : {score} / {total}</p>
    <p>Meilleur score : {bestScore} / {total}</p>
    <button onClick={onRestart}>Recommencer</button>
  </div>
);

export default ScoreBoard;