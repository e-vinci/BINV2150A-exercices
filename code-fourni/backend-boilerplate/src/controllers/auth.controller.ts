import { Request, Response, Router } from "express";
import { UsersMapper } from "../mappers/users.mapper";
import { AuthenticatedRequest } from "../models/auth.model";
import { TokenDTO, UserDTO } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { LoggerService } from "../services/logger.service";
import { UsersService } from "../services/users.service";
import { isCredentialsDTO, isNewUserDTO } from "../utils/guards";

export const authController = Router();

/**
 * POST /auth/register
 * Crée un compte et renvoie un token (l'utilisateur est directement connecté)
 */
authController.post("/register", async (req: Request, res: Response) => {
  LoggerService.info("[POST] /auth/register");

  const body: unknown = req.body;
  if (!isNewUserDTO(body)) return res.sendStatus(400);

  const user = await UsersService.create(UsersMapper.fromNewDTO(body));
  if (!user) return res.sendStatus(409); // email déjà utilisé

  const token = await AuthService.login(body.email, body.password);
  if (!token) return res.sendStatus(500);

  const tokenDTO: TokenDTO = { token: token };
  return res.status(201).json(tokenDTO);
});

/**
 * POST /auth/login
 * Vérifie les identifiants et renvoie un token
 */
authController.post("/login", async (req: Request, res: Response) => {
  LoggerService.info("[POST] /auth/login");

  const body: unknown = req.body;
  if (!isCredentialsDTO(body)) return res.sendStatus(400);

  const token = await AuthService.login(body.email, body.password);
  if (!token) return res.sendStatus(401);

  const tokenDTO: TokenDTO = { token: token };
  return res.status(200).json(tokenDTO);
});

/**
 * GET /auth/me
 * Renvoie l'utilisateur correspondant au token
 */
authController.get("/me", AuthService.authorize, (req: AuthenticatedRequest, res: Response) => {
  LoggerService.info("[GET] /auth/me");

  if (!req.user) return res.sendStatus(401);

  const user = UsersService.getById(req.user.id);
  if (!user) return res.sendStatus(401); // compte supprimé depuis la création du token

  const userDTO: UserDTO = UsersMapper.toDTO(user);
  return res.status(200).json(userDTO);
});
