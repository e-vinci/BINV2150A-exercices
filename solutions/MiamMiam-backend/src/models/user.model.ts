import { BasicModel, BasicModelDBO, BasicModelDTO } from "./mm.model";

export enum ERole {
  USER = "user",
  ADMIN = "admin",
}

/** Utilisateur dans le code métier */
export interface User extends BasicModel {
  email: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  role: ERole;
  favorites: number[]; // ids des recettes favorites
}

/** Données nécessaires à la création d'un utilisateur (inscription) */
export interface NewUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/** Forme stockée dans data/users.json */
export interface UserDBO extends BasicModelDBO {
  email: string;
  hashed_password: string;
  first_name: string;
  last_name: string;
  role: ERole;
  favorites: number[];
}

/** Utilisateur renvoyé par l'API (jamais le mot de passe !) */
export interface UserDTO extends BasicModelDTO {
  email: string;
  firstName: string;
  lastName: string;
  role: ERole;
  favorites: number[];
}

/** Informations publiques d'un utilisateur (ex : auteur d'une recette) */
export interface UserShortDTO {
  id: number;
  firstName: string;
  lastName: string;
}

/** Corps de POST /auth/register */
export interface NewUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/** Corps de POST /auth/login */
export interface CredentialsDTO {
  email: string;
  password: string;
}

/** Réponse de POST /auth/register et POST /auth/login */
export interface TokenDTO {
  token: string;
}
