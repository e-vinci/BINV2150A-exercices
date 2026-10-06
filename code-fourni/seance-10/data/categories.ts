import type { Category } from "../models/category";

// Mêmes catégories que les données de démonstration du backend MiamMiam (npm run demo:seed)
export const categories: Category[] = [
  {
    id: 1,
    name: "Entrée",
    description: "Pour ouvrir l'appétit",
  },
  {
    id: 2,
    name: "Plat",
    description: "Le cœur du repas",
  },
  {
    id: 3,
    name: "Dessert",
    description: "La touche sucrée",
  },
  {
    id: 4,
    name: "Boisson",
    description: "Cocktails, smoothies et autres",
  },
  {
    id: 5,
    name: "Apéro",
    description: "À grignoter entre amis",
  },
];
