import { NewRecipeDTO, UpdatedRecipeDTO } from "../models/recipe.model";
import { CredentialsDTO, NewUserDTO } from "../models/user.model";

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
  return obj &&
  isNonEmptyString(obj.title) &&
  isString(obj.description) &&
  (!obj.imageUrl || isString(obj.imageUrl)) &&
  isNumber(obj.prepTime) && obj.prepTime>=0 &&
  isNumber(obj.cookTime) && obj.cookTime>=0 &&
  isNumber(obj.servings) && obj.servings>=1 &&
  isNumber(obj.difficulty) && obj.difficulty>=1 && obj.difficulty<=5 &&
  isNumber(obj.categoryId) &&
  (!obj.tags || Array.isArray(obj.tags)) &&
  Array.isArray(obj.ingredients) &&
  Array.isArray(obj.steps);
}


//Ajout d'un nouveau guard pour "UpdatedRecipeDTO" (décrit dans la consigne)
export function isUpdatedRecipeDTO(obj: any): obj is UpdatedRecipeDTO{
  return obj &&
  (!obj.title || isNonEmptyString(obj.title)) &&
  (!obj.description || isString(obj.description)) &&
  (!obj.imageUrl || isString(obj.imageUrl)) &&
  (!obj.prepTime || isNumber(obj.prepTime) && obj.prepTime>=0) &&
  (!obj.cookTime || isNumber(obj.cookTime) && obj.cookTime>=0) &&
  (!obj.servings || isNumber(obj.servings) && obj.servings>=1) &&
  (!obj.difficulty || isNumber(obj.difficulty) && obj.difficulty>=1 && obj.difficulty<=5) &&
  (!obj.categoryId || isNumber(obj.categoryId)) &&
  (!obj.tags || Array.isArray(obj.tags)) &&
  (!obj.ingredients || Array.isArray(obj.ingredients)) &&
  (!obj.steps || Array.isArray(obj.steps));
}
