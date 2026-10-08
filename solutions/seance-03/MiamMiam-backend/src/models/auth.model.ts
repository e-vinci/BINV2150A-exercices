import { Request } from "express";
import { ERole } from "./user.model";

/**
 * Requête Express enrichie par le middleware AuthService.authorize :
 * après ce middleware, req.user contient l'utilisateur authentifié.
 */
export interface AuthenticatedRequest extends Request {
  /*************************************/
  /*         Solution Seance 03        */
  /*************************************/
  user?: TokenPayload;
}

/*************************************/
/*         Solution Seance 03        */
/*************************************/
// A voir en fonction de si veut ajouter d'autres roles dans le futur => enum
export interface TokenPayload {
  id: number;
  email: string;
  role: ERole;
}
