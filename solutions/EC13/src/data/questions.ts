import type { Question } from "../models/question";

export const questions: Question[] = [
  { id: 1, text: "Quel hook garde un état dans un composant ?", choices: ["useEffect", "useState", "useParams"], answerIndex: 1 },
  { id: 2, text: "Comment s'appelle la fonction retournée par un effet pour tout arrêter ?", choices: ["Le nettoyage", "Le callback", "La closure"], answerIndex: 0 },
  { id: 3, text: "Que fait setTimeout ?", choices: ["Répète une fonction", "Appelle une fonction une fois, plus tard", "Bloque le code pendant le délai"], answerIndex: 1 },
  { id: 4, text: "Par quoi doit commencer le nom d'un hook personnalisé ?", choices: ["hook", "use", "get"], answerIndex: 1 },
  { id: 5, text: "Dans MVVM, que représente le ViewModel ?", choices: ["Les composants", "Les types de données", "Les hooks"], answerIndex: 2 },
];