import { Request, Response, Router } from "express";
import { RecipesMapper } from "../mappers/recipes.mapper";
import { AuthenticatedRequest } from "../models/auth.model";
import { RecipeDTO, RecipeFilter } from "../models/recipe.model";
import { ERole } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { CategoriesService } from "../services/categories.service";
import { LoggerService } from "../services/logger.service";
import { RecipesService } from "../services/recipes.service";
import { isNewRecipeDTO, isString, isUpdatedRecipeDTO } from "../utils/guards";

export const recipesController = Router();

/**
 * GET /recipes?categoryId=&authorId=&search=&ingredient=&maxPrepTime=
 * Toutes les recettes, éventuellement filtrées par les query parameters
 */
recipesController.get("/", (req: Request, res: Response) => {
  LoggerService.info("[GET] /recipes");

  const filter: RecipeFilter = {};


  //Est-il pertinent de destructurer alors que les const doivent de toute façon etre redefinies selon les conditions (Number ou quoi)
  if (isString(req.query.categoryId)) {
    const categoryId = Number(req.query.categoryId);
    if (!Number.isInteger(categoryId)) return res.sendStatus(400);
    filter.categoryId = categoryId;
  }
  if (isString(req.query.authorId)) {
    const authorId = Number(req.query.authorId);
    if (!Number.isInteger(authorId)) return res.sendStatus(400);
    filter.authorId = authorId;
  }
  if (isString(req.query.search) && req.query.search.trim() !== "") {
    filter.search = req.query.search.trim();
  }
  if (isString(req.query.ingredient) && req.query.ingredient.trim() !== "") {
    filter.ingredient = req.query.ingredient.trim();
  }
  if (isString(req.query.maxPrepTime)) {
    const maxPrepTime = Number(req.query.maxPrepTime);
    if (!Number.isInteger(maxPrepTime) || maxPrepTime < 0) return res.sendStatus(400);
    filter.maxPrepTime = maxPrepTime;
  }

  const recipes = RecipesService.getAll(filter);
  const recipesDTO: RecipeDTO[] = recipes.map(recipe => RecipesMapper.toDTO(recipe)); //Map plutôt que for
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

  const updatedRecipe = RecipesMapper.fromNewDTO(body, user.id);
  const recipe = RecipesService.create(updatedRecipe);
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

  const{user, params, body} = req; //destructuration
  const id = Number(params.id);
  if (!Number.isInteger(id) || id < 1) return res.sendStatus(400);

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
 * PATCH /recipes/:id
 * Update certains champs d'une recette existante (auteur ou admin uniquement)
 */
recipesController.patch("/:id", AuthService.authorize, (req: AuthenticatedRequest, res: Response) => {

  const{user, params, body} = req;
  
  if(!user) return res.sendStatus(401);

  const id = Number(params.id);
  if (!Number.isInteger(id) || id < 1 || !isUpdatedRecipeDTO(body)) return res.sendStatus(400);


  const oldRecipe = RecipesService.getById(id);
  if (!oldRecipe) return res.sendStatus(404);

  if (oldRecipe.authorId !== user.id && user.role !== ERole.ADMIN) return res.sendStatus(403);

  const updatedRecipe = RecipesService.update(id, {...oldRecipe, ...body});
  
  if(!updatedRecipe) return res.sendStatus(400);

  res.status(200).json(RecipesMapper.toDTO(updatedRecipe));
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
