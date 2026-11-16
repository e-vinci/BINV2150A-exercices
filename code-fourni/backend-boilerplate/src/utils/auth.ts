import jwt from "jsonwebtoken";
import { TokenPayload } from "../models/auth.model";
import { LoggerService } from "../services/logger.service";

const SECRET_KEY = process.env.JWT_SECRET!;

/** Crée un token JWT signé, valable 1 jour */
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1d",
    algorithm: "HS256",
  });
}

/** Vérifie la signature et l'expiration du token ; renvoie son contenu, ou undefined s'il est invalide */
export function verifyToken(token: string): TokenPayload | undefined {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as TokenPayload;
    return decoded;
  } catch (error) {
    LoggerService.error("Token invalide : " + error);
    return undefined;
  }
}
