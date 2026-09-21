import { Request, Response, Router } from "express";
import { UsersMapper } from "../mappers/users.mapper";
import { AuthenticatedRequest } from "../models/auth.model";
import { TokenDTO, UserDTO } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { LoggerService } from "../services/logger.service";
import { UsersService } from "../services/users.service";
import { isCredentialsDTO, isNewUserDTO } from "../utils/guards";
import { generateToken } from "../utils/auth";

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

  const { email, password } = body;
  const user = UsersService.getByEmail(email);

  if (!user || user.password !== password) { // pas sécurisé, hachage à voir en séance 04
    return res.sendStatus(401);
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  res.json({token})
  /* const body: unknown = req.body;
  if (!isCredentialsDTO(body)) return res.sendStatus(400);

  const email = body.email;
  const password = body.password;

  const token = AuthService.login(email, password);
  if (!token) return res.sendStatus(401);

  const tokenDTO: TokenDTO = { token: token };
  return res.status(200).json(tokenDTO); */
});

/**
 * GET /auth/me
 * Renvoie l'utilisateur correspondant au token
 */
authController.get("/me", AuthService.authorize, (req: AuthenticatedRequest, res: Response) => {
  LoggerService.info("[GET] /auth/me");

  if (!req.user) return res.sendStatus(401);
  const tokenPayload = req.user;

  const user = UsersService.getByEmail(tokenPayload.email)!     //should not happen
  
  const userDTO: UserDTO = UsersMapper.toDTO(user);
  return res.status(200).json(userDTO);
});
