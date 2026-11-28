export interface Question {
  id: number;
  text: string;
  choices: string[];
  answerIndex: number; // position de la bonne réponse dans choices
}
