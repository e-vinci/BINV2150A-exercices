import { BasicModel, BasicModelDBO, BasicModelDTO } from "./mm.model";

/** Catégorie de recette (entrée, plat, dessert, ...) */
export interface Category extends BasicModel {
  name: string;
  description: string;
}

export interface CategoryDBO extends BasicModelDBO {
  name: string;
  description: string;
}

export interface CategoryDTO extends BasicModelDTO {
  name: string;
  description: string;
}
