import { createContext, useEffect, useState } from "react";
import { loginRequest, refreshRequest, logoutRequest } from "./authService";
import { setAccessToken, clearAccessToken } from "./tokenService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    const data = await loginRequest(credentials);
    setAccessToken(data.accessToken);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch {}
    clearAccessToken();
    setUser(null);
  };

  const restoreSession = async () => {
    try {
      const data = await refreshRequest();
      setAccessToken(data.accessToken);
      setUser(data.user);
    } catch {
      clearAccessToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    restoreSession();
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  if (loading) return null; // prevent flicker

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
