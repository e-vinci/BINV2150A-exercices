import { NextFunction, Response } from "express";
import { AuthenticatedRequest, TokenPayload } from "../models/auth.model";
import { ERole, User } from "../models/user.model";
import { generateToken,verifyToken} from "../utils/auth";
import { LoggerService } from "./logger.service";
import { UsersService } from "./users.service";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";



export class AuthService {


  // ____________________________SEANCE 4 CE QUE J'AI MODIFIER OU AJOUTER____________________
  /**
   * Vérifie les identifiants.
   * @returns un token si l'email et le mot de passe sont corrects, undefined sinon
   */
  static async login(email: string, password: string): Promise<string | undefined> {
    const user = UsersService.getByEmail(email);
    
    if (!user) return undefined;

    // Vérifier le mot de passe avec le hash stocké
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return undefined; // Mot de passe incorrect

    return generateToken({
      id : user.id,
      email : user.email,
      role : user.role,
    });
  }
  
  
  /**
   * Middleware : vérifie le token du header Authorization et place l'utilisateur dans req.user.
   * Répond 401 si le token est absent ou invalide.
   */

  // ______________________SEANCE 3 CE QUE JE FAIS OU MODIFIER ______________________________________
  static authorize(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.get("Authorization");
    if (!token) {
      LoggerService.error("Missing Authorization header");
      return res.sendStatus(401);
    }

    const payload = verifyToken(token);
    if(!payload){
      LoggerService.error("Invalid token");
      return res.sendStatus(401)
    }
    req.user = payload;
    return next();
    
    // let user: User | undefined = undefined;
    // try {
    //   const email = validateFakeToken(token);
    //   user = UsersService.getByEmail(email);
    // } catch (error) {
    //   LoggerService.error(error);
    // }

    // if (!user) {
    //   LoggerService.error("Invalid token");
    //   return res.sendStatus(401);
    // }

    // req.user = user; // disponible dans les middlewares et routes suivants
    // return next();
  }

  /**
   * Middleware (à placer après authorize) : n'autorise que les administrateurs.
   * Répond 403 sinon.
   */

  
  // ______________________SEANCE 3 CE QUE JE FAIS OU MODIFIER ______________________________________
  static isAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (req.user === undefined) return res.sendStatus(401);
    if (req.user.role !== "admin") return res.sendStatus(403);
    return next();
  }
}





