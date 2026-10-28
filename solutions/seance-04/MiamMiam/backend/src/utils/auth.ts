import jwt from "jsonwebtoken";
import { TokenPayload } from "../models/auth.model";

const SECRET_KEY = process.env.JWT_SECRET!;

export const generateToken = (payload: TokenPayload): string => 
  jwt.sign(payload, SECRET_KEY, { expiresIn: "1d", algorithm: "HS256" });

export const verifyToken = (token: string): TokenPayload | undefined => {
  try {
    return jwt.verify(token,SECRET_KEY) as TokenPayload;
  } catch {
    return undefined;
  }
};