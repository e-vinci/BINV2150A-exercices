import { CredentialsDTO, NewUserDTO } from "../models/user.model";
import { NewRecipeDTO, UpdatedRecipeDTO } from "../models/recipe.model";

/**
 * Type guards : fonctions qui vérifient à l'exécution qu'une valeur inconnue
 * (typiquement req.body ou req.params) a bien la forme attendue.
 * Si la fonction renvoie true, TypeScript considère la valeur comme du type indiqué.
 */

export function isNumber(obj: any): obj is number {
  return typeof obj === "number" && !isNaN(obj) && isFinite(obj);
}

export function isString(obj: any): obj is string {
  return typeof obj === "string";
}

export function isNonEmptyString(obj: any): obj is string {
  return isString(obj) && obj.trim().length !== 0;
}

export function isObject(obj: any): obj is object {
  return typeof obj === "object" && obj !== null;
}

// == USER ==

export function isNewUserDTO(obj: any): obj is NewUserDTO {
  return (
    isObject(obj) &&
    isNonEmptyString((obj as any).email) &&
    (obj as any).email.includes("@") &&
    isNonEmptyString((obj as any).password) &&
    isNonEmptyString((obj as any).firstName) &&
    isNonEmptyString((obj as any).lastName)
  );
}

export function isCredentialsDTO(obj: any): obj is CredentialsDTO {
  return (
    isObject(obj) &&
    isNonEmptyString((obj as any).email) &&
    isNonEmptyString((obj as any).password)
  );
}

// == RECIPE ==

export function isNewRecipeDTO(obj: any): obj is NewRecipeDTO {
  if (!isObject(obj)) return false;
  const recipe = obj as any;
  if (!isNonEmptyString(recipe.title)) return false;
  if (!isString(recipe.description)) return false;
  if (recipe.imageUrl !== undefined && !isString(recipe.imageUrl)) return false;
  if (!isNumber(recipe.prepTime) || recipe.prepTime < 0) return false;
  if (!isNumber(recipe.cookTime) || recipe.cookTime < 0) return false;
  if (!isNumber(recipe.servings) || recipe.servings < 1) return false;
  if (!isNumber(recipe.difficulty) || recipe.difficulty < 1 || recipe.difficulty > 5) return false;
  if (!isNumber(recipe.categoryId)) return false;
  if (recipe.tags !== undefined && !Array.isArray(recipe.tags)) return false;
  if (!Array.isArray(recipe.ingredients)) return false;
  if (!Array.isArray(recipe.steps)) return false;
  return true;
}

export function isUpdatedRecipeDTO(obj: any): obj is UpdatedRecipeDTO {
  if (!isObject(obj)) return false;

  const recipe = obj as any;

  if (recipe.title !== undefined && !isNonEmptyString(recipe.title)) return false;
  if (recipe.description !== undefined && !isString(recipe.description)) return false;
  if (recipe.imageUrl !== undefined && !isString(recipe.imageUrl)) return false;
  if (recipe.prepTime !== undefined && (!isNumber(recipe.prepTime) || recipe.prepTime < 0)) return false;
  if (recipe.cookTime !== undefined && (!isNumber(recipe.cookTime) || recipe.cookTime < 0)) return false;
  if (recipe.servings !== undefined && (!isNumber(recipe.servings) || recipe.servings < 1)) return false;
  if (recipe.difficulty !== undefined && (!isNumber(recipe.difficulty) || recipe.difficulty < 1 || recipe.difficulty > 5)) return false;
  if (recipe.categoryId !== undefined && !isNumber(recipe.categoryId)) return false;
  if (recipe.tags !== undefined && !Array.isArray(recipe.tags)) return false;
  if (recipe.ingredients !== undefined && !Array.isArray(recipe.ingredients)) return false;
  if (recipe.steps !== undefined && !Array.isArray(recipe.steps)) return false;

  return true;
}
