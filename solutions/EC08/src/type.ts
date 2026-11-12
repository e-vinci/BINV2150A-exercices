export type Category = "Alimentation" | "Transport" | "Loisirs";

export const categories: Category[] = ["Alimentation", "Transport", "Loisirs"];

export interface Expense {
  id: number;
  label: string;
  amount: number;
  category: Category;
}

export type NewExpense = Omit<Expense, "id">;