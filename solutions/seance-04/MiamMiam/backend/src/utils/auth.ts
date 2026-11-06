import jwt from "jsonwebtoken";
import { TokenPayload } from "../models/auth.model";
import { LoggerService } from "../services/logger.service";

/**
 * Clé secrète utilisée pour signer et vérifier les JWT.
 * Elle est lue dans env/dev.env (jamais écrite dans le code).
 */
const SECRET_KEY = process.env.JWT_SECRET!;

/**
 * Crée un JWT signé qui contient les informations de l'utilisateur.
 * Il expire au bout d'1 jour.
 */
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1d",
    algorithm: "HS256",
  });
}

/**
 * Vérifie un JWT (signature + expiration).
 * @returns le payload si le token est valide, undefined sinon
 */
export function verifyToken(token: string): TokenPayload | undefined {
  try {
    return jwt.verify(token, SECRET_KEY) as TokenPayload;
  } catch (error) {
    LoggerService.error(error); 
    return undefined;
  }
}