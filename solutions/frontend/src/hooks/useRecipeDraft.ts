import { useEffect, useState } from "react";
import type { IngredientInput, NewRecipe, RecipeFormData, StepInput } from "../models/recipe";
import { clearDraft, loadDraft, saveDraft } from "../utils/storage";
import type { ChangeEvent, SubmitEvent } from "react";

type IngredientField = "name" | "quantity" | "unit";

const initialForm: RecipeFormData = {
    title: "",
    description: "",
    imageUrl: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    difficulty: 0,
    categoryId: "",
}

export const useRecipeDraft = (onAdd : (recipe : NewRecipe) => number) =>{
    const [ingredients, setIngredients] = useState<IngredientInput[]>(() => loadDraft()?.ingredients ?? []);
    const [form, setForm] = useState<RecipeFormData>(() => loadDraft()?.form ?? initialForm);
    const [steps, setSteps] = useState<StepInput[]>(() => loadDraft()?.steps ?? []);
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        saveDraft({ form, ingredients, steps });
    }, [form, ingredients, steps]);

    useEffect(() => {
        saveDraft({ form, ingredients, steps });
    }, [form, ingredients, steps]);

    const addStep = () =>
        setSteps([...steps, { key: Date.now(), text: "" }]);


    const removeStep = (key: number) =>
        setSteps(steps.filter((step => step.key !== key)));


    const updateStep = (key: number, text: string) =>
        setSteps(
            steps.map((step) =>
                step.key === key ? { ...step, text } : step)
        );

    const moveStep = (index: number, offset: -1 | 1) => {
        const target = index + offset;
        if (target < 0 || target >= steps.length) return;

        const copy = [...steps];
        [copy[index], copy[target]] = [copy[target], copy[index]];
        setSteps(copy);
    };

    const addIngredient = () =>
        setIngredients([...ingredients, { key: Date.now(), name: "", quantity: "", unit: "" }]);


    const removeIngredient = (key: number) =>
        setIngredients(ingredients.filter((ingredient) => ingredient.key !== key));


    const updateIngredient = (key: number, field: IngredientField, value: string) =>
        setIngredients(
            ingredients.map((ingredient) =>
                ingredient.key === key ? { ...ingredient, [field]: value } : ingredient)
        );

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value })
    };

    const titleError = form.title.trim().length < 3;
    const prepTimeError = form.prepTime === "" || Number(form.prepTime) < 0;
    const cookTimeError = form.cookTime === "" || Number(form.cookTime) < 0;
    const servingsError = form.servings === "" || Number(form.servings) < 1;
    const categoryError = form.categoryId === "";

    const validIngredients = ingredients.filter(
        (ingredients) => ingredients.name.trim() !== "" && Number(ingredients.quantity) > 0
    )
    const ingredientsError = validIngredients.length === 0;

    const stepsError = !steps.some((step) => step.text.trim() !== "");

    const isValid =
        !titleError && !prepTimeError && !cookTimeError && !servingsError && !categoryError && !ingredientsError && !stepsError;

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
        if (!isValid) return;

        onAdd({
            title: form.title.trim(),
            description: form.description,
            imageUrl: form.imageUrl,
            difficulty: form.difficulty,
            categoryId: Number(form.categoryId),
            prepTime: Number(form.prepTime),
            cookTime: Number(form.cookTime),
            servings: Number(form.servings),
            ingredients: validIngredients.map(({ name, quantity, unit }) => ({
                name: name.trim(),
                quantity: Number(quantity),
                unit,
            })),
            steps: steps
                .map((step) => step.text.trim())
                .filter((text) => text !== ""),
            tags: [],
        });

        setForm(initialForm);
        setIngredients([]);
        setSteps([]);
        setSubmitted(false);
        clearDraft();

    }

    const handleClearDraft = () => {
        clearDraft();              // vide le stockage
        setForm(initialForm);      // remet l'écran à zéro
        setIngredients([]);
        setSteps([]);
        setSubmitted(false);       // cache les messages d'erreur éventuels
    };


    return {handleSubmit,submitted,form,handleChange,titleError,setForm,
        categoryError,prepTimeError,cookTimeError,
        servingsError,ingredients,updateIngredient,removeIngredient,ingredientsError, 
        addIngredient,steps, addStep,moveStep ,removeStep, 
        updateStep, stepsError, handleClearDraft}
}


