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
authController.post("/register", async(req: Request, res: Response) => {
  LoggerService.info("[POST] /auth/register");

  const body: unknown = req.body;
  if (!isNewUserDTO(body)) return res.sendStatus(400);

  const newUser = UsersMapper.fromNewDTO(body);
  const user =await UsersService.create(newUser);
  if (!user) return res.sendStatus(409); // email déjà utilisé

  const token = await AuthService.login(user.email, body.password);//TODO:demander au prof de verifier
  if (!token) return res.sendStatus(500);

  
  return res.status(201).json({ token });
});

/**
 * POST /auth/login
 * Vérifie les identifiants et renvoie un token
 */

authController.post("/login", async(req: Request, res: Response) => {
  LoggerService.info("[POST] /auth/login");

  const body: unknown = req.body;
  if (!isCredentialsDTO(body)) return res.sendStatus(400);

    const {email, password} = body;
    //const user = UsersService.getByEmail(email);
    const token = await AuthService.login(email, password);
    if (!token) return res.sendStatus(401); // Non autorisé : email ou mot de passe incorrect
    res.json({ token });
});

/**
 * GET /auth/me
 * Renvoie l'utilisateur correspondant au token
 */
authController.get("/me", AuthService.authorize, (req: AuthenticatedRequest, res: Response) => {
  LoggerService.info("[GET] /auth/me");

  if (!req.user) return res.sendStatus(401);
  const user = UsersService.getById(req.user.id);
  if (!user) return res.sendStatus(404);
  const userDTO: UserDTO = UsersMapper.toDTO(user);
  return res.status(200).json(userDTO);
});
