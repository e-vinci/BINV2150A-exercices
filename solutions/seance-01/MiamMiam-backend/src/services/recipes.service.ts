import { RecipesMapper } from "../mappers/recipes.mapper";
import { NewRecipe, Recipe, RecipeDBO, RecipeFilter } from "../models/recipe.model";
import { AbstractService } from "./abstract.service";
import { UsersService } from "./users.service";

export class RecipesService extends AbstractService {
  protected static dbPath: string = "data/recipes.json";

  private static readRecipesDB(): Recipe[] {
    return RecipesService.readDB<RecipeDBO, Recipe>(RecipesMapper.fromDBO);
  }

  private static writeRecipesDB(recipes: Recipe[]): boolean {
    return RecipesService.writeDB<Recipe, RecipeDBO>(recipes, RecipesMapper.toDBO);
  }

  /**
   * Toutes les recettes, éventuellement filtrées.
   * Les filtres sont cumulatifs (ET logique).
   */
  // static getAll(filter: RecipeFilter): Recipe[] {
  //   const recipes = this.readRecipesDB();
  //   const result: Recipe[] = [];

  //   for (const recipe of recipes) {
  //     if (filter.categoryId !== undefined && recipe.categoryId !== filter.categoryId) {
  //       continue;
  //     }
  //     if (filter.authorId !== undefined && recipe.authorId !== filter.authorId) {
  //       continue;
  //     }
  //     if (filter.search !== undefined) {
  //       const search = filter.search.toLowerCase();
  //       const inTitle = recipe.title.toLowerCase().includes(search);
  //       const inDescription = recipe.description.toLowerCase().includes(search);
  //       if (!inTitle && !inDescription) {
  //         continue;
  //       }
  //     }
  //     if (filter.ingredient !== undefined) {
  //       const ingredient = filter.ingredient.toLowerCase();
  //       const found = recipe.ingredients.some((item) => item.name.toLowerCase().includes(ingredient)); // Changé (programmation fonctionnelle)
  //       let found = false;
  //       for (const item of recipe.ingredients) {
  //         if (item.name.toLowerCase().includes(ingredient)) {
  //           found = true;
  //         }
  //       }
  //       if (!found) {
  //         continue;
  //       }
  //       if(!found) return false;

  //       if(filter.maxPrepTime !== undefined && recipe.prepTime + recipe.cookTime > filter.maxPrepTime) return true;

  //     }
  //     if (filter.maxPrepTime !== undefined && recipe.prepTime + recipe.cookTime > filter.maxPrepTime) {
  //       continue;
  //     }
  //     result.push(recipe);
  //   }

  //   return result;
  // }

  static getAll(filter: RecipeFilter): Recipe[] {
  const recipes = this.readRecipesDB();

  return recipes.filter((recipe) => {
    if (filter.categoryId !== undefined && recipe.categoryId !== filter.categoryId) return false;
    if (filter.authorId !== undefined && recipe.authorId !== filter.authorId) return false;

    if (filter.search !== undefined) {
      const search = filter.search.toLowerCase();
      const inTitle = recipe.title.toLowerCase().includes(search);
      const inDescription = recipe.description.toLowerCase().includes(search);
      if (!inTitle && !inDescription) return false;
    }

    if (filter.ingredient !== undefined) {
      const ingredient = filter.ingredient.toLowerCase();
      const found = recipe.ingredients.some((item) => item.name.toLowerCase().includes(ingredient)); // ← .some() remplace la boucle interne
      if (!found) return false;
    }

    if (filter.maxPrepTime !== undefined && recipe.prepTime + recipe.cookTime > filter.maxPrepTime) return false;

    return true;
  });
}

static getById(id: number): Recipe | undefined {
  const recipes = this.readRecipesDB();
  return recipes.find((recipe) => recipe.id === id); // ← .find() remplace la boucle
}

static getByIds(ids: number[]): Recipe[] {
  const recipes = this.readRecipesDB();
  return recipes.filter((recipe) => ids.includes(recipe.id)); // ← .filter() remplace la boucle
}

  /**
   * Crée une recette.
   * @returns la recette créée, ou undefined si l'écriture a échoué
   */
  static create(newRecipe: NewRecipe): Recipe | undefined {
    const recipes = this.readRecipesDB();

    const recipe: Recipe = {
    ...newRecipe,                    // ← reprend title, description, imageUrl, prepTime, cookTime, servings, difficulty, categoryId, tags, ingredients, steps, authorId
    id: RecipesService.getNextId(recipes),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

    recipes.push(recipe);
    if (!this.writeRecipesDB(recipes)) {
      return undefined;
    }
    return recipe;
  }

  /**
   * Remplace le contenu d'une recette existante (l'id, l'auteur et la date de création sont conservés).
   * @returns la recette mise à jour, ou undefined si elle n'existe pas
   */
  static update(id: number, updatedRecipe: NewRecipe): Recipe | undefined {
    const recipes = this.readRecipesDB();
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) return undefined;

    const existing = recipes[index];
    const recipe: Recipe = {
      ... updatedRecipe, // ← reprend title, description, imageUrl, prepTime, cookTime, servings, difficulty, categoryId, tags, ingredients, steps
      id : existing.id,
      authorId : existing.authorId,
      createdAt : existing.createdAt,
      updatedAt : new Date(),
    };

    recipes[index] = recipe;
    if (!this.writeRecipesDB(recipes)) {
      return undefined;
    }
    return recipe;
  }

  /**
   * Supprime une recette (et la retire des favoris de tous les utilisateurs).
   * @returns true si supprimée, false si elle n'existait pas
   */
  static delete(id: number): boolean {
    const recipes = this.readRecipesDB();
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) return false;

    recipes.splice(index, 1);
    if (!this.writeRecipesDB(recipes)) return false;

    UsersService.removeFavoriteForAll(id);
    return true;
  }
}
