import { NextFunction, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest, TokenPayload } from "../models/auth.model";
import { ERole } from "../models/user.model";
import { LoggerService } from "./logger.service";
import { UsersService } from "./users.service";

// Clé secrète utilisée pour signer et vérifier les JWT
const SECRET_KEY = process.env.JWT_SECRET!;

export class AuthService {
  /**
   * Vérifie les identifiants.
   * @returns un token si l'email et le mot de passe sont corrects, undefined sinon
   */

  // Le login devient async car bcrypt.compare retourne une Promise
  static async login(email: string, password: string): Promise<string | undefined> {
    const user = UsersService.getByEmail(email);
    if (!user) return undefined;

    // Compare le mot de passe reçu avec le hash stocké
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return undefined;

    // Création du payload du token
    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // Génère un JWT valide pendant 1 jour
    return jwt.sign(payload, SECRET_KEY, {
      expiresIn: "1d",
      algorithm: "HS256",
    });
  }

  /**
   * Middleware : vérifie le token du header Authorization et place l'utilisateur dans req.user.
   * Répond 401 si le token est absent ou invalide.
   */
  static authorize(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.get("Authorization");

    if (!token) {
      LoggerService.error("Missing Authorization header");
      return res.sendStatus(401);
    }

    let payload: TokenPayload | undefined = undefined;

    // Vérifie que le JWT est valide
    try {
      payload = jwt.verify(token, SECRET_KEY) as TokenPayload;
    } catch (error) {
      LoggerService.error(error);
    }

    if (!payload) {
      LoggerService.error("Invalid token");
      return res.sendStatus(401);
    }

    // Stocke les infos du JWT dans la requête
    req.user = payload;

    return next();
  }

  /**
   * Middleware (à placer après authorize) : n'autorise que les administrateurs.
   * Répond 403 sinon.
   */
  static isAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (req.user === undefined) return res.sendStatus(401);

    if (req.user.role !== ERole.ADMIN) return res.sendStatus(403);

    return next();
  }
}