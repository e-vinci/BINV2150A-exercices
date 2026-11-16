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
  static getAll(filter: RecipeFilter): Recipe[] {
    const recipes = this.readRecipesDB();
    const result: Recipe[] = [];

    for (const recipe of recipes) {
      if (filter.categoryId !== undefined && recipe.categoryId !== filter.categoryId) {
        continue;
      }
      if (filter.authorId !== undefined && recipe.authorId !== filter.authorId) {
        continue;
      }
      if (filter.search !== undefined) {
        const search = filter.search.toLowerCase();
        const inTitle = recipe.title.toLowerCase().includes(search);
        const inDescription = recipe.description.toLowerCase().includes(search);
        if (!inTitle && !inDescription) {
          continue;
        }
      }
      if (filter.ingredient !== undefined) {
        const ingredient = filter.ingredient.toLowerCase();
        let found = false;
        for (const item of recipe.ingredients) {
          if (item.name.toLowerCase().includes(ingredient)) {
            found = true;
          }
        }
        if (!found) {
          continue;
        }
      }
      if (filter.maxPrepTime !== undefined && recipe.prepTime + recipe.cookTime > filter.maxPrepTime) {
        continue;
      }
      result.push(recipe);
    }

    return result;
  }

  /**
   * Une recette par son id, ou undefined si elle n'existe pas
   */
  static getById(id: number): Recipe | undefined {
    const recipes = this.readRecipesDB();
    for (const recipe of recipes) {
      if (recipe.id === id) {
        return recipe;
      }
    }
    return undefined;
  }

  /**
   * Les recettes dont les ids sont fournis (ex : favoris d'un utilisateur)
   */
  static getByIds(ids: number[]): Recipe[] {
    const recipes = this.readRecipesDB();
    const result: Recipe[] = [];
    for (const recipe of recipes) {
      if (ids.includes(recipe.id)) {
        result.push(recipe);
      }
    }
    return result;
  }

  /**
   * Crée une recette.
   * @returns la recette créée, ou undefined si l'écriture a échoué
   */
  static create(newRecipe: NewRecipe): Recipe | undefined {
    const recipes = this.readRecipesDB();

    const recipe: Recipe = {
      id: RecipesService.getNextId(recipes),
      title: newRecipe.title,
      description: newRecipe.description,
      imageUrl: newRecipe.imageUrl,
      prepTime: newRecipe.prepTime,
      cookTime: newRecipe.cookTime,
      servings: newRecipe.servings,
      difficulty: newRecipe.difficulty,
      categoryId: newRecipe.categoryId,
      tags: newRecipe.tags,
      ingredients: newRecipe.ingredients,
      steps: newRecipe.steps,
      authorId: newRecipe.authorId,
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
      id: existing.id,
      title: updatedRecipe.title,
      description: updatedRecipe.description,
      imageUrl: updatedRecipe.imageUrl,
      prepTime: updatedRecipe.prepTime,
      cookTime: updatedRecipe.cookTime,
      servings: updatedRecipe.servings,
      difficulty: updatedRecipe.difficulty,
      categoryId: updatedRecipe.categoryId,
      tags: updatedRecipe.tags,
      ingredients: updatedRecipe.ingredients,
      steps: updatedRecipe.steps,
      authorId: existing.authorId,
      createdAt: existing.createdAt,
      updatedAt: new Date(),
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
