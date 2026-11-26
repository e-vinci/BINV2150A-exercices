import {
  emptyForm,
  type IngredientInput,
  type RecipeFormData,
  type StepInput,
} from "../hooks/useRecipeDraft";

const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every((item) => typeof item === "number");

const FAVORITES_KEY = "miammiam.favorites";

export const loadFavorites = (): number[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return isNumberArray(parsed) ? parsed : [];
  } catch {
    return []; // JSON invalide
  }
};

export const saveFavorites = (favorites: number[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

const isIngredientInput = (value: any): value is IngredientInput => {
  return (
    typeof value === "object" &&
    typeof value.key === "number" &&
    typeof value.name === "string" &&
    typeof value.quantity === "string"
  );
};

const isArrayOfIngredientInput = (value: any): value is IngredientInput[] => {
  return Array.isArray(value) && value.every((v) => isIngredientInput(v));
};

const isRecipeFormData = (obj: any): obj is RecipeFormData => {
  return (
    typeof obj === "object" &&
    typeof obj.title === "string" &&
    typeof obj.description === "string" &&
    typeof obj.prepTime === "number" &&
    typeof obj.cookTime === "number" &&
    typeof obj.categoryId === "number" &&
    typeof obj.difficulty === "number" &&
    typeof obj.imgUrl === "string" &&
    typeof obj.servings === "number"
  );
};

const DRAFT_FORM_KEY = "miammiam.recipeFormDraft";
const DRAFT_INGREDIENTS_KEY = "miammiam.ingredientsFormDraft";
const DRAFT_STEPS_KEY = "miammiam.stepsFormDraft";

export const saveDraftForm = (form: RecipeFormData) => {
  sessionStorage.setItem(DRAFT_FORM_KEY, JSON.stringify(form));
};

export const loadDraftForm = () => {
  try {
    const stored = sessionStorage.getItem(DRAFT_FORM_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : emptyForm;
    return isRecipeFormData(parsed) ? parsed : emptyForm;
  } catch {
    return emptyForm;
  }
};

export const saveDraftIngredientsInput = (ingredients: IngredientInput[]) => {
  sessionStorage.setItem(DRAFT_INGREDIENTS_KEY, JSON.stringify(ingredients));
};

export const loadDraftIngredientsInput = () => {
  try {
    const stored = sessionStorage.getItem(DRAFT_INGREDIENTS_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return isArrayOfIngredientInput(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const isStepInput = (obj: any): obj is StepInput => {
  return (
    typeof obj === "object" &&
    typeof obj.key === "number" &&
    typeof obj.name === "string"
  );
};

const isArrayOfStepsInput = (value: any): value is StepInput[] => {
  return Array.isArray(value) && value.every((v) => isStepInput(v));
};

export const saveStepsInput = (steps: StepInput[]) => {
  sessionStorage.setItem(DRAFT_STEPS_KEY, JSON.stringify(steps));
};

export const loadStepsInput = () => {
  try {
    const stored = sessionStorage.getItem(DRAFT_STEPS_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return isArrayOfStepsInput(parsed) ? parsed : [];
  } catch {
    return [];
  }
};
