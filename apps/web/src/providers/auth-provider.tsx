"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthApi } from "@/lib/api/auth";

export interface AuthUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;

  refreshUser: () => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  const refreshUser = async () => {
    try {
      const currentUser =
        await AuthApi.me();

      setUser(currentUser);
    } catch {
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await AuthApi.logout();
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshUser().finally(() =>
      setLoading(false),
    );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within AuthProvider",
    );
  }

  return context;
}