import { Request } from "express";
import { User, ERole } from "./user.model";

/**
 * Requête Express enrichie par le middleware AuthService.authorize :
 * après ce middleware, req.user contient l'utilisateur authentifié.
 */
export interface AuthenticatedRequest extends Request {
  user?: User;
}

/**
 * Modifié pour S03 Exercice filé
 */

export interface TokenPayload {
  id: number;
  email: string;
  role: ERole;
}