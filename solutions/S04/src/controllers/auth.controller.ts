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
 * Inscrit un nouvel utilisateur
 */

// La route devient async car la création de l'utilisateur utilise bcrypt
authController.post("/register", async (req: Request, res: Response) => {
  LoggerService.info("[POST] /auth/register");

  const body: unknown = req.body;
  if (!isNewUserDTO(body)) return res.sendStatus(400);

  // Attend la création et le hachage du mot de passe
  const user = await UsersService.create(body);
  if (!user) return res.sendStatus(409);

  // Attend la vérification du mot de passe avant de générer le token
  const token = await AuthService.login(user.email, body.password);
  if (!token) return res.sendStatus(500);

  const tokenDTO: TokenDTO = { token };
  return res.status(201).json(tokenDTO);
});

/**
 * POST /auth/login
 * Vérifie les identifiants et renvoie un token
 */

// La route devient async car le login utilise bcrypt
authController.post("/login", async (req: Request, res: Response) => {
  LoggerService.info("[POST] /auth/login");

  const body: unknown = req.body;
  if (!isCredentialsDTO(body)) return res.sendStatus(400);

  /*
  const email = body.email;
  const password = body.password;
  */

  // Modification destructuring
  const { email, password } = body;

  // Attend la comparaison du mot de passe avec le hash
  const token = await AuthService.login(email, password);
  if (!token) return res.sendStatus(401);

  const tokenDTO: TokenDTO = { token };
  return res.status(200).json(tokenDTO);
});

/**
 * GET /auth/me
 * Renvoie l'utilisateur correspondant au token
 */
authController.get("/me", AuthService.authorize, (req: AuthenticatedRequest, res: Response) => {
  LoggerService.info("[GET] /auth/me");

  if (!req.user) return res.sendStatus(401);

  // Récupère l'utilisateur complet avec l'id du token
  const user = UsersService.getById(req.user.id);
  if (!user) return res.sendStatus(404);

  const userDTO: UserDTO = UsersMapper.toDTO(user);
  return res.status(200).json(userDTO);
});