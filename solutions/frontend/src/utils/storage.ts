import type { RecipeDraft } from "../models/recipe";

const FAVORITES_KEY = "miammiam.favorites";
const DRAFT_KEY = "miammiam.recipeDraft";

// ---------- Outils de validation ----------

const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every((item) => typeof item === "number");

// "est-ce un objet (et pas null) ?"
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isRecipeDraft = (value: unknown): value is RecipeDraft => {
  if (!isRecord(value)) return false;
  const { form, ingredients, steps } = value;

  if (!isRecord(form)) return false;
  const formOk =
    typeof form.title === "string" &&
    typeof form.description === "string" &&
    typeof form.imageUrl === "string" &&
    typeof form.prepTime === "string" &&
    typeof form.cookTime === "string" &&
    typeof form.servings === "string" &&
    typeof form.difficulty === "number" &&
    typeof form.categoryId === "string";

  const ingredientsOk =
    Array.isArray(ingredients) &&
    ingredients.every(
      (i) =>
        isRecord(i) &&
        typeof i.key === "number" &&
        typeof i.name === "string" &&
        typeof i.quantity === "string" &&
        typeof i.unit === "string"
    );

  const stepsOk =
    Array.isArray(steps) &&
    steps.every(
      (s) => isRecord(s) && typeof s.key === "number" && typeof s.text === "string"
    );

  return formOk && ingredientsOk && stepsOk;
};

// ---------- Brouillon (sessionStorage) ----------
// Choix : sessionStorage. Un brouillon est temporaire et propre à l'onglet où
// l'on écrit : il survit au F5 mais disparaît à la fermeture de l'onglet, et
// deux onglets ne se mélangent pas.

export const loadDraft = (): RecipeDraft | null => {
  try {
    const stored = sessionStorage.getItem(DRAFT_KEY);
    if (!stored) return null;
    const parsed: unknown = JSON.parse(stored);
    return isRecipeDraft(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const saveDraft = (draft: RecipeDraft): void => {
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
};

export const clearDraft = (): void => {
  sessionStorage.removeItem(DRAFT_KEY);
};

// ---------- Favoris (localStorage) ----------

export const loadFavorites = (): number[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return isNumberArray(parsed) ? parsed : [];
  } catch {
    return []; // JSON invalide
  }
};

export const saveFavorites = (favoriteIds: number[]): void => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
};