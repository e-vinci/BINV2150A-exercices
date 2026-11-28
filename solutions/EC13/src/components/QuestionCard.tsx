import type { Question } from "../models/question";

interface QuestionCardProps {
  question: Question;
  number: number;
  total: number;
  selectedIndex: number | null;
  isCorrect: boolean;
  isLastQuestion: boolean;
  onAnswer: (choiceIndex: number) => void;
  onNext: () => void;
}

const QuestionCard = ({
  question, number, total, selectedIndex, isCorrect, isLastQuestion, onAnswer, onNext,
}: QuestionCardProps) => {
  const hasAnswered = selectedIndex !== null;

  return (
    <div>
      <p>Question {number} / {total}</p>
      <h2>{question.text}</h2>

      {question.choices.map((choice, index) => (
        <div key={choice}>
          <button onClick={() => onAnswer(index)} disabled={hasAnswered}>
            {choice}
          </button>
        </div>
      ))}

      {hasAnswered && (
        <>
          <p>
            {isCorrect
              ? "Bonne réponse !"
              : `Raté ! La bonne réponse était : ${question.choices[question.answerIndex]}`}
          </p>
          <button onClick={onNext}>{isLastQuestion ? "Voir le score" : "Suivant"}</button>
        </>
      )}
    </div>
  );
};

export default QuestionCard;