import { NewRecipe, NewRecipeDTO, Recipe, RecipeDBO, RecipeDTO } from "../models/recipe.model";

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
}
