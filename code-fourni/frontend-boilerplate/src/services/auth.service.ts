import type { RegisterData, User } from "../models/user";

const API_URL = "/api";

export const login = async (email: string, password: string): Promise<string> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (response.status === 401) throw new Error("Email ou mot de passe incorrect");
  if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
  const data = await response.json();
  return data.token as string;
};

export const register = async (registerData: RegisterData): Promise<string> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerData),
  });
  if (response.status === 400) throw new Error("Données invalides");
  if (response.status === 409) throw new Error("Cet email est déjà utilisé");
  if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
  const data = await response.json();
  return data.token as string;
};

export const getMe = async (token: string): Promise<User> => {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: token },
  });
  if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
  const data = await response.json();
  return data as User;
};
