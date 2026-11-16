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
authController.post("/register", (req: Request, res: Response) => {
  LoggerService.info("[POST] /auth/register");

  const body: unknown = req.body;
  if (!isNewUserDTO(body)) return res.sendStatus(400);

  const newUser = UsersMapper.fromNewDTO(body);
  const user = UsersService.create(newUser);
  if (!user) return res.sendStatus(409); // email déjà utilisé

  const token = AuthService.login(user.email, user.password);
  if (!token) return res.sendStatus(500);

  const tokenDTO: TokenDTO = { token: token };
  return res.status(201).json(tokenDTO);
});

/**
 * POST /auth/login
 * Vérifie les identifiants et renvoie un token
 */
authController.post("/login", (req: Request, res: Response) => {
  LoggerService.info("[POST] /auth/login");

  const body: unknown = req.body;
  if (!isCredentialsDTO(body)) return res.sendStatus(400);

  const{email, password} = body; //En une ligne au lieu de deux.

  const token = AuthService.login(email, password);
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

  //GetByEmail car req.user est maintenant du type TokenPayload plutôt que User
  if (!req.user) return res.sendStatus(401);
  const user = UsersService.getByEmail(req.user.email);
  if(!user) return res.sendStatus(401);

  const userDTO: UserDTO = UsersMapper.toDTO(user);
  return res.status(200).json(userDTO);
});
