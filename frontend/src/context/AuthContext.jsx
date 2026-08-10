import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("skillsync_token");
    if (!token) {
      setLoading(false);
      return;
    }
    api.get("/api/auth/me")
      .then(res => setUser(res.data))
      .catch(() => localStorage.removeItem("skillsync_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("skillsync_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("skillsync_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
