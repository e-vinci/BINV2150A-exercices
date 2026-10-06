import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../models/auth.model";
import { ERole, User } from "../models/user.model";
import { generateToken, verifyToken } from "../utils/auth";
import { LoggerService } from "./logger.service";
import { UsersService } from "./users.service";
import bcrypt from "bcrypt";

export class AuthService {
  /**
   * Vérifie les identifiants.
   * @returns un token si l'email et le mot de passe sont corrects, undefined sinon
   */
  /*static login(email: string, password: string): string | undefined {
    const user = UsersService.getByEmail(email);
    if (!user) return undefined;
    if (user.password !== password) return undefined;

    const token = generateToken({
      id: 1,
      email: "john@gmail.com",
      role: "user"
    });

    console.log(token);
    return token;
  }*/
 static async login(email: string, password: string): Promise<string | undefined> {
    // Récupérer l'utilisateur par email
    const user = UsersService.getByEmail(email);
    if (!user) return undefined; // Utilisateur non trouvé

    // Vérifier le mot de passe avec le hash stocké
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return undefined; // Mot de passe incorrect

    // Générer un token JWT pour l'utilisateur
    return generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  /**
   * Middleware : vérifie le token du header Authorization et place l'utilisateur dans req.user.
   * Répond 401 si le token est absent ou invalide.
   */
  static authorize(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.get("Authorization");
    if (!token) return res.sendStatus(401);

    const payload = verifyToken(token);
    if (!payload) return res.sendStatus(401);

    req.user = payload; 
    next();
  }

  static isAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (!req.user) return res.sendStatus(401);
    if (req.user.role !== "admin") return res.sendStatus(403);
    next();
  }

}
