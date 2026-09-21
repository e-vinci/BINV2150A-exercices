import {
  NewRecipe,
  NewRecipeDTO,
  Recipe,
  RecipeDBO,
  RecipeDTO,
  UpdatedRecipe,
  UpdatedRecipeDTO,
} from "../models/recipe.model";

export class RecipesMapper {
  static toDTO(recipe: Recipe): RecipeDTO {
    const dto: RecipeDTO = {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      categoryId: recipe.categoryId,
      tags: recipe.tags,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      authorId: recipe.authorId,
      createdAt: recipe.createdAt.toISOString(),
      updatedAt: recipe.updatedAt.toISOString(),
    };
    if (recipe.imageUrl !== undefined && recipe.imageUrl !== null) {
      dto.imageUrl = recipe.imageUrl;
    }
    return dto;
  }

  static fromNewDTO(dto: NewRecipeDTO, authorId: number): NewRecipe {
    return {
      title: dto.title.trim(),
      description: dto.description.trim(),
      imageUrl: dto.imageUrl,
      prepTime: dto.prepTime,
      cookTime: dto.cookTime,
      servings: dto.servings,
      difficulty: dto.difficulty,
      categoryId: dto.categoryId,
      tags: dto.tags ? dto.tags : [],
      ingredients: dto.ingredients,
      steps: dto.steps,
      authorId: authorId,
    };
  }

  static toDBO(recipe: Recipe): RecipeDBO {
    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      image_url: recipe.imageUrl,
      prep_time: recipe.prepTime,
      cook_time: recipe.cookTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      category_id: recipe.categoryId,
      tags: recipe.tags,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      author_id: recipe.authorId,
      created_at: recipe.createdAt.toISOString(),
      updated_at: recipe.updatedAt.toISOString(),
    };
  }

  static fromDBO(dbo: RecipeDBO): Recipe {
    return {
      id: dbo.id,
      title: dbo.title,
      description: dbo.description,
      imageUrl: dbo.image_url,
      prepTime: dbo.prep_time,
      cookTime: dbo.cook_time,
      servings: dbo.servings,
      difficulty: dbo.difficulty,
      categoryId: dbo.category_id,
      tags: dbo.tags ? dbo.tags : [],
      ingredients: dbo.ingredients ? dbo.ingredients : [],
      steps: dbo.steps ? dbo.steps : [],
      authorId: dbo.author_id,
      createdAt: new Date(dbo.created_at),
      updatedAt: new Date(dbo.updated_at),
    };
  }

  // MODIF
  static fromUpdatedRecipeDTO(dto: UpdatedRecipeDTO): UpdatedRecipe {
    let updatedRecipe: UpdatedRecipe = {};

    // L'objectif ici est de filtrer les champs possiblement undefined
    // L'utilisation de Object.keys() dans ce cas ne semble pas permis par TS pour redéfinir les attributs de updatedRecipe
    if (dto.title) updatedRecipe.title = dto.title;
    if (dto.description) updatedRecipe.description = dto.description;
    if (dto.prepTime) updatedRecipe.prepTime = dto.prepTime;
    if (dto.cookTime) updatedRecipe.cookTime = dto.cookTime;
    if (dto.servings) updatedRecipe.servings = dto.servings;
    if (dto.difficulty) updatedRecipe.difficulty = dto.difficulty;
    if (dto.categoryId) updatedRecipe.categoryId = dto.categoryId;
    if (dto.tags) updatedRecipe.tags = dto.tags;
    if (dto.ingredients) updatedRecipe.ingredients = dto.ingredients;
    if (dto.steps) updatedRecipe.steps = dto.steps;
    if (dto.authorId) updatedRecipe.authorId = dto.authorId;

    return updatedRecipe;
  }
}
