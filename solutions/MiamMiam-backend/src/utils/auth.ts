//Suppression du commentaire concernant la BASE64

import { TokenPayload } from "../models/auth.model";
import jwt from "jsonwebtoken";
import { LoggerService } from "../services/logger.service";

//Suppression des fonctions generateFakeToken et ValidateFakeToken au profit de celle utilisant JWT

const SECRET_KEY = process.env.JWT_SECRET!;
export function generateToken(user: TokenPayload){
  return jwt.sign(
    user, //Payload
    SECRET_KEY, //Secret key
    {
      expiresIn: "1d",
      algorithm: "HS256"
    }
  );
}

//Changement des fonctions concernant le token en passant à JWT, plus un fake token en base64
export function verifyToken(token: string): TokenPayload | null {
  try{
    const decoded = jwt.verify(token, SECRET_KEY) as TokenPayload
    return decoded;
  }catch(error){
    LoggerService.error("auth.ts/verifyToken : token invalide");
    console.error("Token invalide: ", error);
    return null;
  }
}


