export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}
export interface Recipe {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: number;
  categoryId: number;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
  authorId: number;
}

export type NewRecipe = Omit<Recipe, "id" | "authorId">;
