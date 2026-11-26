import { useEffect, useState, type SubmitEvent } from "react";
import type { NewRecipe } from "../models/recipe";
import {
  loadDraftForm,
  loadDraftIngredientsInput,
  loadStepsInput,
  saveDraftForm,
  saveDraftIngredientsInput,
  saveStepsInput,
} from "../utils/storage";
import { useNavigate } from "react-router";

export interface RecipeFormData {
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  categoryId: number;
  difficulty: number;
  imgUrl: string;
  servings: number;
}

export interface IngredientInput {
  key: number; // identifiant local, pour la key React
  name: string;
  quantity: string; // chaîne, comme les autres champs numériques
  unit: string;
}
export type IngredientField = "name" | "quantity" | "unit"; // champs modifiables

export interface StepInput {
  key: number;
  name: string;
}

export const emptyForm: RecipeFormData = {
  title: "",
  description: "",
  prepTime: 0,
  cookTime: 0,
  difficulty: 0,
  imgUrl: "",
  categoryId: 1,
  servings: 0,
};

export const useRecipeDraft = (onAdd: (recipe: NewRecipe) => number) => {
  const [form, setForm] = useState<RecipeFormData>(() => loadDraftForm());
  const [ingredients, setIngredients] = useState<IngredientInput[]>(() =>
    loadDraftIngredientsInput(),
  );
  const [steps, setSteps] = useState<StepInput[]>(() => loadStepsInput());
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    saveDraftForm(form);
  }, [form]);

  useEffect(() => {
    saveDraftIngredientsInput(ingredients);
  }, [ingredients]);

  useEffect(() => {
    saveStepsInput(steps);
  }, [steps]);

  // VALIDATIONS
  const prepTimeError = form.prepTime <= 0;
  const cookTimeError = form.cookTime < 0;
  const servingsError = form.servings < 1;
  const titleError = form.title.trim().length < 3;
  const hasOneIngredient = ingredients.length >= 1;
  const hasOneStep = steps.length >= 1;
  const allIngredientsHaveANameANDPositiveQuantity = ingredients.every(
    (i) => i.name.trim() !== "" && Number(i.quantity) > 0,
  );
  const allStepsHaveAName = steps.every((s) => s.name.trim() !== "");

  const isValid =
    !titleError &&
    !prepTimeError &&
    !cookTimeError &&
    !servingsError &&
    hasOneIngredient &&
    hasOneStep &&
    allIngredientsHaveANameANDPositiveQuantity &&
    allStepsHaveAName;

  // FORM FUNCTIONS
  const cleanForm = () => {
    setForm(emptyForm);
    setIngredients([]);
    setSteps([]);
  };

  const handleChange = (name: string, value: string | number) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (!isValid) {
      console.log("Not a valid submission");
      return;
    }

    const newRecipe: NewRecipe = {
      ...form,
      ingredients: ingredients.map((i) => ({
        name: i.name,
        quantity: Number(i.quantity),
        unit: i.unit,
      })),

      steps: steps.map((s) => s.name),
      tags: [],
    };

    const id = onAdd(newRecipe);

    cleanForm();
    setSubmitted(false);
    navigate("/recipes/" + id);
  };

  // INGREDIENTS FUNCTIONS
  const addIngredient = () =>
    setIngredients((prev) => [
      ...prev,
      { key: Date.now(), name: "", quantity: "", unit: "g" },
    ]);

  const removeIngredient = (key: number) =>
    setIngredients(ingredients.filter((ingredient) => ingredient.key !== key));

  const updateIngredient = (
    key: number,
    field: IngredientField,
    value: string,
  ) =>
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.key === key ? { ...ingredient, [field]: value } : ingredient,
      ),
    );

  // STEPS FUNCTIONS
  const addStep = () => {
    setSteps((prev) => [...prev, { key: Date.now(), name: "" }]);
  };

  const removeStep = (key: number) => {
    setSteps(steps.filter((step) => step.key !== key));
  };

  const updateStep = (key: number, name: string) => {
    setSteps(
      steps.map((step) => (step.key === key ? { ...step, name: name } : step)),
    );
  };

  const switchSteps = (key: number, to: number) => {
    const idxStep1 = steps.findIndex((s) => s.key === key);
    if (idxStep1 === -1) return;

    const step1 = { ...steps[idxStep1] };
    const step2 = { ...steps[idxStep1 + to] };
    const keyStep2 = step2.key;

    setSteps(
      steps.map((s) => {
        if (s.key === key) {
          return { ...step2, key: key };
        } else if (s.key === keyStep2) {
          return { ...step1, key: keyStep2 };
        }
        return s;
      }),
    );
  };

  return {
    form,
    submitted,
    handleChange,
    handleSubmit,
    titleError,
    servingsError,
    prepTimeError,
    cookTimeError,
    hasOneIngredient,
    allIngredientsHaveANameANDPositiveQuantity,
    ingredients,
    updateIngredient,
    removeIngredient,
    addIngredient,
    hasOneStep,
    allStepsHaveAName,
    steps,
    updateStep,
    removeStep,
    switchSteps,
    addStep,
    cleanForm,
  };
};
