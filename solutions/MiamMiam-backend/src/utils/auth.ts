/**
 * "Fake token" : un simple encodage Base64 de l'email de l'utilisateur.
 *
 * C'est le même mécanisme que dans le projet Web 1. Il permet d'identifier
 * l'utilisateur à chaque requête, mais n'importe qui peut fabriquer un token
 * valide en encodant un email... Il sera remplacé par un vrai mécanisme
 * d'authentification (JWT) dans la suite du cours.
 */
import jwt from "jsonwebtoken";
import { TokenPayload } from "../models/auth.model";

const SECRET_KEY = process.env.JWT_SECRET!;

export const generateToken = (user : TokenPayload): string => {
  // return Buffer.from(email, "utf-8").toString("base64");

  return jwt.sign(
    user,
    SECRET_KEY,
    {
      expiresIn : "1d",
      algorithm : "HS256"
    }
  );
}

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

// export const validateFakeToken = (token: string): string => {
//   return Buffer.from(token, "base64").toString("utf-8");
// };



