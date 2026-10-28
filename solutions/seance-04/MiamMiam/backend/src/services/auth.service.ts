import { NextFunction, Response } from "express";
import { AuthenticatedRequest, TokenPayload } from "../models/auth.model";
import { ERole} from "../models/user.model";
import { generateToken, verifyToken } from "../utils/auth";
import { LoggerService } from "./logger.service";
import { UsersService } from "./users.service";
import bcrypt from "bcrypt";

export class AuthService {
  /**
   * Vérifie les identifiants.
   * @returns un token si l'email et le mot de passe sont corrects, undefined sinon
   */
  static async login(email: string, password: string): Promise<string | undefined> {
    const user = UsersService.getByEmail(email);
    if (!user) return undefined;
    if (!(await bcrypt.compare(password, user.password))) return undefined;
    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return generateToken(payload);
  }

  /**
   * Middleware : vérifie le token du header Authorization et place l'utilisateur dans req.user.
   * Répond 401 si le token est absent ou invalide.
   */
  static authorize(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    const token = req.get("Authorization");
    if (!token) {
      LoggerService.error("Missing Authorization header");
      return res.sendStatus(401);
    }

    const payload = verifyToken(token);
    if (!payload) {
      LoggerService.error("Invalid token");
      return res.sendStatus(401);
    }

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
