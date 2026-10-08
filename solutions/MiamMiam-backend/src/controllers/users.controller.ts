import { Response, Router } from "express";
import { RecipesMapper } from "../mappers/recipes.mapper";
import { UsersMapper } from "../mappers/users.mapper";
import { AuthenticatedRequest } from "../models/auth.model";
import { RecipeDTO } from "../models/recipe.model";
import { ERole, UserDTO, UserShortDTO } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { LoggerService } from "../services/logger.service";
import { RecipesService } from "../services/recipes.service";
import { UsersService } from "../services/users.service";

export const usersController = Router();

/**
 * GET /users
 * Tous les utilisateurs (admin uniquement)
 */
usersController.get("/", AuthService.authorize, AuthService.isAdmin, (req: AuthenticatedRequest, res: Response) => {
  LoggerService.info("[GET] /users");

  const users = UsersService.getAll();
  const usersDTO: UserDTO[] = users.map(user => UsersMapper.toDTO(user)); //programmation fonctionelle
  return res.status(200).json(usersDTO);
});

// Attention à l'ordre : /me/... doit être déclaré avant /:id

/**
 * GET /users/me/favorites
 * Les recettes favorites de l'utilisateur connecté
 */
usersController.get("/me/favorites", AuthService.authorize, (req: AuthenticatedRequest, res: Response) => {
  LoggerService.info("[GET] /users/me/favorites");

  if (!req.user) return res.sendStatus(401);
  const user = UsersService.getByEmail(req.user.email); //On getByEmail car l'objet req.user n'est plus un User mais un TokenPayload. On sait qu'il est présent car lae user est connecté.e

  const recipes = RecipesService.getByIds(user!.favorites);
  const recipesDTO: RecipeDTO[] = recipes.map(recipe => RecipesMapper.toDTO(recipe)); //Programmation fonctionnelle
  return res.status(200).json(recipesDTO);
});

/**
 * PUT /users/me/favorites/:recipeId
 * Ajoute une recette aux favoris de l'utilisateur connecté
 */
usersController.put("/me/favorites/:recipeId", AuthService.authorize, (req: AuthenticatedRequest, res: Response) => {
  LoggerService.info("[PUT] /users/me/favorites/:recipeId");

  if (!req.user) return res.sendStatus(401);
  const user = req.user;

  const recipeId = Number(req.params.recipeId);
  if (!Number.isInteger(recipeId) || recipeId < 1) return res.sendStatus(400);

  if (!RecipesService.getById(recipeId)) return res.sendStatus(404);

  if (!UsersService.addFavorite(user.id, recipeId)) return res.sendStatus(500);

  return res.sendStatus(204);
});

/**
 * DELETE /users/me/favorites/:recipeId
 * Retire une recette des favoris de l'utilisateur connecté
 */
usersController.delete("/me/favorites/:recipeId", AuthService.authorize, (req: AuthenticatedRequest, res: Response) => {
  LoggerService.info("[DELETE] /users/me/favorites/:recipeId");

  if (!req.user) return res.sendStatus(401);
  const user = req.user;

  const recipeId = Number(req.params.recipeId);
  if (!Number.isInteger(recipeId) || recipeId < 1) return res.sendStatus(400);

  if (!UsersService.removeFavorite(user.id, recipeId)) return res.sendStatus(500);

  return res.sendStatus(204);
});

/**
 * GET /users/:id
 * Un utilisateur : informations complètes pour soi-même ou un admin, publiques sinon
 */
usersController.get("/:id", AuthService.authorize, (req: AuthenticatedRequest, res: Response) => {
  LoggerService.info("[GET] /users/:id");

  if (!req.user) return res.sendStatus(401);
  const currentUser = req.user;

  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return res.sendStatus(400);

  const user = UsersService.getById(id);
  if (!user) return res.sendStatus(404);

  if (currentUser.id === user.id || currentUser.role === ERole.ADMIN) {
    const userDTO: UserDTO = UsersMapper.toDTO(user);
    return res.status(200).json(userDTO);
  }
  const userShortDTO: UserShortDTO = UsersMapper.toShortDTO(user);
  return res.status(200).json(userShortDTO);
});

/**
 * DELETE /users/:id
 * Supprime un utilisateur (admin uniquement, pas soi-même)
 */
usersController.delete("/:id", AuthService.authorize, AuthService.isAdmin, (req: AuthenticatedRequest, res: Response) => {
  LoggerService.info("[DELETE] /users/:id");

  if (!req.user) return res.sendStatus(401);
  const currentUser = req.user;

  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return res.sendStatus(400);
  if (id === currentUser.id) return res.sendStatus(400);

  if (!UsersService.getById(id)) return res.sendStatus(404);

  if (!UsersService.delete(id)) return res.sendStatus(500);

  return res.sendStatus(204);
});
