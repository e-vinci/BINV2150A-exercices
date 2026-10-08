import { NewRecipeDTO } from "../models/recipe.model";
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

export function isNewUserDTO(obj : any) : obj is NewUserDTO {
  if(!isObject(obj)) return false;

  const {email, password, firstName, lastName } = obj as any; // destructuring
  return(
    isNonEmptyString(email) &&
    email.includes("@") &&
    isNonEmptyString(password) && 
    isNonEmptyString(firstName) && 
    isNonEmptyString(lastName)
  );
}

export function isCredentialsDTO(obj: any): obj is CredentialsDTO {
  if(!isObject(obj)) return false;

  const {email, password} = obj as any; // destructuring
  return (
    isNonEmptyString(email) && isNonEmptyString(password)
  );
}

// == RECIPE ==

export function isNewRecipeDTO(obj: any): obj is NewRecipeDTO {
  if (!isObject(obj)) return false;
  const {title, description, imageUrl, prepTime, cookTime, servings, difficulty, categoryId, tags, ingredients, steps } = obj as any; // destructuring 
  if (!isNonEmptyString(title)) return false;
  if (!isString(description)) return false;
  if (imageUrl !== undefined && !isString(imageUrl)) return false;
  if (!isNumber(prepTime) || prepTime < 0) return false;
  if (!isNumber(cookTime) || cookTime < 0) return false;
  if (!isNumber(servings) || servings < 1) return false;
  if (!isNumber(difficulty) || difficulty < 1 || difficulty > 5) return false;
  if (!isNumber(categoryId)) return false;
  if (tags !== undefined && !Array.isArray(tags)) return false;
  if (!Array.isArray(ingredients)) return false;
  if (!Array.isArray(steps)) return false;
  return true;
}
