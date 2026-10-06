import { CategoriesMapper } from "../mappers/categories.mapper";
import { Category, CategoryDBO } from "../models/category.model";
import { AbstractService } from "./abstract.service";

export class CategoriesService extends AbstractService {
  protected static dbPath: string = "data/categories.json";

  private static readCategoriesDB(): Category[] {
    return CategoriesService.readDB<CategoryDBO, Category>(CategoriesMapper.fromDBO);
  }

  /**
   * Toutes les catégories
   */
  static getAll(): Category[] {
    return this.readCategoriesDB();
  }

  /**
   * Une catégorie par son id, ou undefined si elle n'existe pas
   */
  static getById(id: number): Category | undefined {
    const categories = this.readCategoriesDB();
    for (const category of categories) {
      if (category.id === id) {
        return category;
      }
    }
    return undefined;
  }
}
