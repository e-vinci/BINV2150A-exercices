import { Request } from "express";
import { ERole } from "./user.model";

/**
 * Informations identifiant l'utilisateur, stockées dans le payload du JWT.
 * Attention : n'importe qui peut lire le payload, on n'y met jamais le mot de passe.
 */
export interface TokenPayload {
  id: number;
  email: string;
  role: ERole;
}

/**
 * Requête Express enrichie par le middleware AuthService.authorize :
 * après ce middleware, req.user contient le payload du token (id, email, role).
 */
export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}