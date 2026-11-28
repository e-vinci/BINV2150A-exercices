import { useState } from "react";
import { questions } from "../data/questions";

export const useQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // --- valeurs DÉDUITES (pas d'état en plus) ---
  const isFinished = currentIndex >= questions.length;
  const question = isFinished ? null : questions[currentIndex];
  const hasAnswered = selectedIndex !== null;
  const isCorrect = question !== null && selectedIndex === question.answerIndex;
  const isLastQuestion = currentIndex === questions.length - 1;

  // --- actions ---
  const answer = (choiceIndex: number) => {
    if (question === null || hasAnswered) return; // une seule réponse par question
    setSelectedIndex(choiceIndex);
    if (choiceIndex === question.answerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const next = () => {
    setSelectedIndex(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedIndex(null);
  };

  return {
    question,
    number: currentIndex + 1,
    total: questions.length,
    score,
    selectedIndex,
    hasAnswered,
    isCorrect,
    isLastQuestion,
    isFinished,
    answer,
    next,
    restart,
  };
};