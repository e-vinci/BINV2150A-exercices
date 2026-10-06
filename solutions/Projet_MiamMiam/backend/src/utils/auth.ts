/**
 * "Fake token" : un simple encodage Base64 de l'email de l'utilisateur.
 *
 * C'est le même mécanisme que dans le projet Web 1. Il permet d'identifier
 * l'utilisateur à chaque requête, mais n'importe qui peut fabriquer un token
 * valide en encodant un email... Il sera remplacé par un vrai mécanisme
 * d'authentification (JWT) dans la suite du cours.
 */

// npm install jsonwebtoken
// npm install --save-dev @types/jsonwebtoken
import jwt from "jsonwebtoken";
import { TokenPayload } from "../models/auth.model";

// Clé secrète pour signer le token
const SECRET_KEY = process.env.JWT_SECRET!;

export function generateToken(user: TokenPayload): string {
  return jwt.sign(
    user,
    SECRET_KEY,
    {
      expiresIn: "1d", // Expire dans 1 jour
      algorithm: "HS256", // algorithme de signature
    }
  );
}

// Vérifier et décoder
export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as TokenPayload;
    return decoded;
  } catch (error) {
    // Token invalide, expiré, etc.
    console.error("Token invalide :", error);
    return null;
  }
}
