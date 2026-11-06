/**
 * Modifié pour S03 Exercice filé
 */

import jwt from "jsonwebtoken";
import { TokenPayload } from "../models/auth.model";

const SECRET_KEY = process.env.JWT_SECRET!;

/** Génère un JWT signé, valable 1 jour */
export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1d",
    algorithm: "HS256",
  });
};

/** Vérifie la signature et l'expiration. Renvoie le payload, ou undefined si invalide */
export const verifyToken = (token: string): TokenPayload | undefined => {
  try {
    return jwt.verify(token, SECRET_KEY) as TokenPayload;
  } catch (error) {
    return undefined;
  }
};