"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios, { AxiosError } from "axios";
import { AuthContextType, LoginResponse, RegisterResponse, User } from "@/types/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", { withCredentials: true });
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // ================== login ==================
  const login = async (values: { phone: string; password: string }): Promise<LoginResponse> => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", values, {
        withCredentials: true,
      });
      setUser(res.data);
      return { success: true, data: res.data };
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // ================== register ==================
  const register = async (values: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }): Promise<RegisterResponse> => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", values, {
        withCredentials: true,
      });
      setUser(res.data);
      return { success: true, data: res.data };
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };

  // ================== logout ==================
  const logout = async () => {
    await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// ================== Hook ==================
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
