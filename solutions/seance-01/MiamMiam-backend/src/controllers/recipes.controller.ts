import { Request, Response, Router } from "express";
import { RecipesMapper } from "../mappers/recipes.mapper";
import { AuthenticatedRequest } from "../models/auth.model";
import { RecipeDTO, RecipeFilter } from "../models/recipe.model";
import { ERole } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { CategoriesService } from "../services/categories.service";
import { LoggerService } from "../services/logger.service";
import { RecipesService } from "../services/recipes.service";
import { isNewRecipeDTO, isString } from "../utils/guards";

export const recipesController = Router();

/**
 * GET /recipes?categoryId=&authorId=&search=&ingredient=&maxPrepTime=
 * Toutes les recettes, éventuellement filtrées par les query parameters
 */
recipesController.get("/", (req: Request, res: Response) => {
  LoggerService.info("[GET] /recipes");

  const filter: RecipeFilter = {};
  const {categoryId,authorId,search,ingredient, maxPrepTime} = req.query; // changé (destructuring)

  if (isString(categoryId)) {
    const categoryId = Number(authorId);
    if (!Number.isInteger(categoryId)) return res.sendStatus(400);
    filter.categoryId = categoryId;
  }
  if (isString(authorId)) {
    const authId = Number(authorId);
    if (!Number.isInteger(authId)) return res.sendStatus(400);
    filter.authorId = authId;
  }
  if (isString(search) && search.trim() !== "") {
    filter.search = search.trim();
  }
  if (isString(ingredient) && ingredient.trim() !== "") {
    filter.ingredient = ingredient.trim();
  }
  if (isString(maxPrepTime)) {
    const maxPrep = Number(maxPrepTime);
    if (!Number.isInteger(maxPrepTime) || maxPrep < 0) return res.sendStatus(400);
    filter.maxPrepTime = maxPrep;
  }

  const recipes = RecipesService.getAll(filter);
  const recipesDTO: RecipeDTO[] = recipes.map((recipe) => RecipesMapper.toDTO(recipe));
  // for (const recipe of recipes) {
  //   recipesDTO.push(RecipesMapper.toDTO(recipe));
  // }
  return res.status(200).json(recipesDTO);
});

/**
 * GET /recipes/:id
 * Une recette
 */
recipesController.get("/:id", (req: Request, res: Response) => {
  LoggerService.info("[GET] /recipes/:id");

  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return res.sendStatus(400);

  const recipe = RecipesService.getById(id);
  if (!recipe) return res.sendStatus(404);

  return res.status(200).json(RecipesMapper.toDTO(recipe));
});

/**
 * POST /recipes
 * Crée une recette (utilisateur connecté = auteur)
 */
recipesController.post("/", AuthService.authorize, (req: AuthenticatedRequest, res: Response) => {
  LoggerService.info("[POST] /recipes");

  if (!req.user) return res.sendStatus(401);
  const user = req.user;

  const body: unknown = req.body;
  if (!isNewRecipeDTO(body)) return res.sendStatus(400);

  if (!CategoriesService.getById(body.categoryId)) return res.sendStatus(400); // catégorie inconnue

  const newRecipe = RecipesMapper.fromNewDTO(body, user.id);
  const recipe = RecipesService.create(newRecipe);
  if (!recipe) return res.sendStatus(500);

  return res.status(201).json(RecipesMapper.toDTO(recipe));
});

/**
 * PUT /recipes/:id
 * Remplace une recette (auteur ou admin uniquement)
 */
recipesController.put("/:id", AuthService.authorize, (req: AuthenticatedRequest, res: Response) => {
  LoggerService.info("[PUT] /recipes/:id");

  if (!req.user) return res.sendStatus(401);
  const user = req.user;

  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return res.sendStatus(400);

  const body: unknown = req.body;
  if (!isNewRecipeDTO(body)) return res.sendStatus(400);

  const recipe = RecipesService.getById(id);
  if (!recipe) return res.sendStatus(404);

  if (recipe.authorId !== user.id && user.role !== ERole.ADMIN) return res.sendStatus(403);

  if (!CategoriesService.getById(body.categoryId)) return res.sendStatus(400); // catégorie inconnue

  const updated = RecipesService.update(id, RecipesMapper.fromNewDTO(body, recipe.authorId));
  if (!updated) return res.sendStatus(500);

  return res.sendStatus(204);
});

/**
 * DELETE /recipes/:id
 * Supprime une recette (auteur ou admin uniquement)
 */
recipesController.delete("/:id", AuthService.authorize, (req: AuthenticatedRequest, res: Response) => {
  LoggerService.info("[DELETE] /recipes/:id");

  if (!req.user) return res.sendStatus(401);
  const user = req.user;

  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return res.sendStatus(400);

  const recipe = RecipesService.getById(id);
  if (!recipe) return res.sendStatus(404);

  if (recipe.authorId !== user.id && user.role !== ERole.ADMIN) return res.sendStatus(403);

  if (!RecipesService.delete(id)) return res.sendStatus(500);

  return res.sendStatus(204);
});
