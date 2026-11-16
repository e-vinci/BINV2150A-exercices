import { useEffect, useState } from "react";
import * as authService from "../services/auth.service";
import type { RegisterData, User } from "../models/user";

const TOKEN_KEY = "token";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<User | null>(null);

  // Charge l'utilisateur à chaque nouveau token ; un token invalide déconnecte l'utilisateur
  useEffect(() => {
    if (!token) return;
    authService
      .getMe(token)
      .then((me) => setUser(me))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
      });
  }, [token]);

  const login = async (email: string, password: string) => {
    const newToken = await authService.login(email, password); // lève une erreur si refusé
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const register = async (data: RegisterData) => {
    const newToken = await authService.register(data); // lève une erreur si refusé
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  return { token, user, login, register, logout };
};
