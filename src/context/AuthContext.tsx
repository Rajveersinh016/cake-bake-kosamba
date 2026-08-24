"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "customer" | "admin" | "super_admin" | "manager" | "staff";

export interface UserSession {
  email: string;
  name: string;
  role: UserRole;
  token: string;
}

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginAsAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "cakebake_auth_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        const parsed: UserSession = JSON.parse(saved);
        if (parsed && parsed.token && parsed.role) {
          setUser(parsed);
          // Set cookie for server route boundary checking fallback
          document.cookie = `cakebake_role=${parsed.role}; path=/; max-age=86400; SameSite=Lax`;
        }
      }
    } catch (err) {
      console.warn("Failed to parse saved auth session:", err);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const loginAsAdmin = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    // Demo Authentication verification with structured error response
    if (email.trim().toLowerCase() === "admin@cakeandbake.in" && pass === "admin123") {
      const session: UserSession = {
        email: "admin@cakeandbake.in",
        name: "Bakery Owner",
        role: "admin",
        token: `demo-token-${Date.now()}`,
      };
      setUser(session);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
        document.cookie = `cakebake_role=admin; path=/; max-age=86400; SameSite=Lax`;
      } catch (e) {
        console.warn("Could not save auth session to storage:", e);
      }
      return { success: true };
    }
    return { success: false, error: "Invalid email or password. Use demo credentials: admin@cakeandbake.in / admin123" };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      document.cookie = "cakebake_role=; path=/; max-age=0;";
    } catch (e) {
      console.warn("Error clearing storage during logout:", e);
    }
    router.push("/admin/login");
  };

  const isAdmin = user?.role === "admin" || user?.role === "super_admin";
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, loginAsAdmin, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
