import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TokenPayload } from "../models/auth.model";
import { LoggerService } from "../services/logger.service";

/**
 * "Fake token" : un simple encodage Base64 de l'email de l'utilisateur.
 *
 * C'est le même mécanisme que dans le projet Web 1. Il permet d'identifier
 * l'utilisateur à chaque requête, mais n'importe qui peut fabriquer un token
 * valide en encodant un email... Il sera remplacé par un vrai mécanisme
 * d'authentification (JWT) dans la suite du cours.
 */

export const generateFakeToken = (email: string): string => {
  return Buffer.from(email, "utf-8").toString("base64");
};

export const validateFakeToken = (token: string): string => {
  return Buffer.from(token, "base64").toString("utf-8");
};

/*************************************/
/*         Solution Seance 03        */
/*************************************/
/**
 * Génère le token d'auth avec jsonwebtoken
 */
export function generateToken(user: TokenPayload): string {
  return jwt.sign(user, process.env.JWT_SECRET!, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
}

/**
 * Vérifie la validité d'un jsonwebtoken et renvoie le payload
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
  } catch (error) {
    LoggerService.error("Token invalide : " + error);
    return null;
  }
}

/*************************************/
/*         Solution Seance 04        */
/*************************************/
export async function hashPassword(plainPassword: string): Promise<string> {
  try {
    return await bcrypt.hash(plainPassword, 10);
  } catch (error) {
    throw new Error("Erreur lors du hachage");
  }
}

export async function verifyPassword(
  plainPassword: string,
  storedHash: string,
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, storedHash);
}
