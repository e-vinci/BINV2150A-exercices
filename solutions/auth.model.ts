import { Request } from "express";
import { ERole, User } from "./user.model";

/**
 * Requête Express enrichie par le middleware AuthService.authorize :
 * après ce middleware, req.user contient l'utilisateur authentifié.
 */
export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export interface TokenPayload {
  id:number,
  email:string,
  role: "user" | "admin"
}
