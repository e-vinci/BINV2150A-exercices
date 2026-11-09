export enum ERole {
  USER = "user",
  ADMIN = "admin",
}

/** Utilisateur dans le code métier (password = mot de passe haché) */
export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: ERole;
}

/** Forme stockée dans data/users.json */
export interface UserDBO {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: ERole;
}

/** Utilisateur renvoyé par l'API (jamais le mot de passe !) */
export interface UserDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: ERole;
}

/** Données nécessaires à la création d'un utilisateur (mot de passe en clair) */
export interface NewUser {
  email: string;
  password: string;
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
