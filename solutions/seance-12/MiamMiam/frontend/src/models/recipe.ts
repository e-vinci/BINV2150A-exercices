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
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  difficulty: number; // 1 à 5
  categoryId: number;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
  authorId: number;
}