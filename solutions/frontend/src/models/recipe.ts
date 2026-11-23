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

export interface RecipeFormData {
    title: string;
    description: string;
    imageUrl: string;
    prepTime: string;
    cookTime: string;
    servings: string;
    difficulty: number;
    categoryId: string;
}

export interface IngredientInput {
    key: number;
    name: string;
    quantity: string;
    unit: string;
}

export interface StepInput {
    key: number;
    text: string;
}

// Tout ce qu'on sauvegarde pour un brouillon
export interface RecipeDraft {
  form: RecipeFormData;
  ingredients: IngredientInput[];
  steps: StepInput[];
}

export type NewRecipe = Omit<Recipe, "id" | "authorId">;