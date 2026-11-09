import bcrypt from "bcrypt";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../models/auth.model";
import { ERole } from "../models/user.model";
import { generateToken, verifyToken } from "../utils/auth";
import { UsersService } from "./users.service";

export class AuthService {
  /**
   * Vérifie l'email et le mot de passe (en clair) de l'utilisateur.
   * @returns un token JWT, ou undefined si les identifiants sont incorrects
   */
  static async login(email: string, password: string): Promise<string | undefined> {
    const user = UsersService.getByEmail(email);
    if (!user) return undefined;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return undefined;

    return generateToken({ id: user.id, email: user.email, role: user.role });
  }

  /**
   * Middleware : vérifie le token de l'en-tête Authorization (401 sinon)
   * et place ses données dans req.user
   */
  static authorize(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.get("Authorization");
    if (!token) return res.sendStatus(401);

    const payload = verifyToken(token);
    if (!payload) return res.sendStatus(401);

    req.user = payload;
    next();
  }

  /**
   * Middleware : refuse l'accès aux non-administrateurs (403)
   */
  static isAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (!req.user) return res.sendStatus(401);
    if (req.user.role !== ERole.ADMIN) return res.sendStatus(403);
    next();
  }
}
