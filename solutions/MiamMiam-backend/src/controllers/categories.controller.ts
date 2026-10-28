import { Request, Response, Router } from "express";
import { CategoriesMapper } from "../mappers/categories.mapper";
import { CategoryDTO } from "../models/category.model";
import { CategoriesService } from "../services/categories.service";
import { LoggerService } from "../services/logger.service";

export const categoriesController = Router();

/**
 * GET /categories
 * Toutes les catégories
 */
categoriesController.get("/", (req: Request, res: Response) => {
  LoggerService.info("[GET] /categories");

  const categories = CategoriesService.getAll();
  const categoriesDTO: CategoryDTO[] = categories.map(category => CategoriesMapper.toDTO(category));
  return res.status(200).json(categoriesDTO);
});

/**
 * GET /categories/:id
 * Une catégorie
 */
categoriesController.get("/:id", (req: Request, res: Response) => {
  LoggerService.info("[GET] /categories/:id");

  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return res.sendStatus(400);

  const category = CategoriesService.getById(id);
  if (!category) return res.sendStatus(404);

  return res.status(200).json(CategoriesMapper.toDTO(category));
});
