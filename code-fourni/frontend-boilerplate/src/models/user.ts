/** Utilisateur renvoyé par GET /auth/me */
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
}

/** Corps de POST /auth/register */
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
