import { Category, CategoryDBO, CategoryDTO } from "../models/category.model";

export class CategoriesMapper {
  static toDTO(category: Category): CategoryDTO {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
    };
  }

  static toDBO(category: Category): CategoryDBO {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      created_at: category.createdAt.toISOString(),
      updated_at: category.updatedAt.toISOString(),
    };
  }

  static fromDBO(dbo: CategoryDBO): Category {
    return {
      id: dbo.id,
      name: dbo.name,
      description: dbo.description,
      createdAt: new Date(dbo.created_at),
      updatedAt: new Date(dbo.updated_at),
    };
  }
}
