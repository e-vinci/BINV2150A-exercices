import { Request } from "express";
import { ERole } from "./user.model";

/** Données contenues dans le token JWT */
export interface TokenPayload {
  id: number;
  email: string;
  role: ERole;
}

/** Requête dont l'utilisateur a été authentifié par AuthService.authorize */
export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}
