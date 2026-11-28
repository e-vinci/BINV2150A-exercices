import QuestionCard from "./components/QuestionCard";
import ScoreBoard from "./components/ScoreBoard";
import { useBestScore } from "./hooks/useBestScore";
import { useQuiz } from "./hooks/useQuiz";

const App = () => {
  const quiz = useQuiz();
  const { bestScore, submitScore } = useBestScore();

  const handleNext = () => {
    if (quiz.isLastQuestion) {
      submitScore(quiz.score); // le score est déjà à jour : on l'a compté à la réponse
    }
    quiz.next();
  };

  return (
    <>
      <h1>Quiz</h1>
      {quiz.question === null ? (
        <ScoreBoard
          score={quiz.score}
          total={quiz.total}
          bestScore={bestScore}
          onRestart={quiz.restart}
        />
      ) : (
        <QuestionCard
          question={quiz.question}
          number={quiz.number}
          total={quiz.total}
          selectedIndex={quiz.selectedIndex}
          isCorrect={quiz.isCorrect}
          isLastQuestion={quiz.isLastQuestion}
          onAnswer={quiz.answer}
          onNext={handleNext}
        />
      )}
    </>
  );
};

export default App;