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

     return recipes.filter(r=>{
      if (filter.categoryId !== undefined && r.categoryId !== filter.categoryId)
        return false;

      if (filter.authorId !== undefined && r.authorId !== filter.authorId)
        return false;

      if (filter.search !== undefined) {
        const search = filter.search.toLowerCase();
        const inTitle = r.title.toLowerCase().includes(search);
        const inDescription = r.description.toLowerCase().includes(search);
        if ( !inTitle && !inDescription)
          return false;
      }

      if (filter.ingredient !== undefined ) {
        const ingredient = filter.ingredient.toLowerCase();
        const found = r.ingredients.find( item => item.name.toLowerCase().includes(ingredient)) !== undefined;
        if ( !found)
          return false;
      }

      if (filter.maxPrepTime !== undefined && r.prepTime + r.cookTime > filter.maxPrepTime) {
        return false;
      }

      return true;
    });
  }
    

  /**
   * Une recette par son id, ou undefined si elle n'existe pas
   */
  static getById(id: number): Recipe | undefined {
    const recipes = this.readRecipesDB();
    return recipes.find(r=>r.id===id);
  }

  /**
   * Les recettes dont les ids sont fournis (ex : favoris d'un utilisateur)
   */
  static getByIds(ids: number[]): Recipe[] {
    const recipes = this.readRecipesDB();
    return recipes.filter(r=> ids.includes(r.id));
  }

  /**
   * Crée une recette.
   * @returns la recette créée, ou undefined si l'écriture a échoué
   */
  static create(newRecipe: NewRecipe): Recipe | undefined {
    const recipes = this.readRecipesDB();

    const recipe: Recipe = {
      ...newRecipe,
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
      ...updatedRecipe,
      id: existing.id,
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
