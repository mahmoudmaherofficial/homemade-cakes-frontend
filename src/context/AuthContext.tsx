"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthContextType, User } from "@/types/types";
import { LogoutApi, MeApi } from "@/app/api/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const setUser = (user: User | null) => {
    setUserState(user);
  };

  const clearUser = async () => {
    setUserState(null);
    await LogoutApi();
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await MeApi();
        setUserState(res.data);
      } catch {
        setUserState(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  console.log(user);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, clearUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
