import { BasicModel, BasicModelDBO, BasicModelDTO } from "./mm.model";

/** Un ingrédient d'une recette : "200 g de farine" */
export interface Ingredient {
  name: string;
  quantity: number;
  unit: string; // "g", "ml", "pièce", "c. à soupe", ...
}

/** Recette dans le code métier */
export interface Recipe extends BasicModel {
  title: string;
  description: string;
  imageUrl?: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number; // nombre de personnes
  difficulty: number; // 1 (facile) à 5 (difficile)
  categoryId: number;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
  authorId: number;
}

/** Données nécessaires à la création d'une recette */
export interface NewRecipe {
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

/** Forme stockée dans data/recipes.json */
export interface RecipeDBO extends BasicModelDBO {
  title: string;
  description: string;
  image_url?: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: number;
  category_id: number;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
  author_id: number;
}

/** Recette renvoyée par l'API */
export interface RecipeDTO extends BasicModelDTO {
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

/** Corps de POST /recipes et PUT /recipes/:id (l'auteur est déduit du token) */
export interface NewRecipeDTO {
  title: string;
  description: string;
  imageUrl?: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: number;
  categoryId: number;
  tags?: string[];
  ingredients: Ingredient[];
  steps: string[];
}

export interface UpdatedRecipeDTO{
  title?: string;
  description?: string;
  imageUrl?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: number;
  categoryId?: number;
  tags?: string[];
  ingredients?: Ingredient[];
  steps?: string[];
}

/** Filtres de GET /recipes (query parameters, tous optionnels) */
export interface RecipeFilter {
  categoryId?: number;
  authorId?: number;
  search?: string; // dans le titre ou la description
  ingredient?: string; // nom d'ingrédient
  maxPrepTime?: number; // prepTime + cookTime <= maxPrepTime
}
