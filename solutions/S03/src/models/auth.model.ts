import { Request } from "express";

// Informations stockées dans le token JWT
export interface TokenPayload {
  id: number;
  email: string;
  role: "user" | "admin";
}

// Requête avec l'utilisateur authentifié
export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}