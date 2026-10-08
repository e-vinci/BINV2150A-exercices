import jwt from "jsonwebtoken";
import { TokenPayload } from "../models/auth.model";
import bcrypt from "bcrypt";

// Clé secrète pour signer le token / Lecture dans le code : process.env.NOM_DE_LA_VARIABLE (string | undefined)
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


// Créer un hash
async function hashPassword(plainPassword: string): Promise<string> {
  const saltRounds = 10;
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
}

// Comparer le mot de passe saisi avec le hash stocké
async function verifyPassword(plainPassword: string, storedHash: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(plainPassword, storedHash);
  return isMatch;
}

















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
