"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/utils/apiClient";
import { useRouter } from "next/navigation";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN";
};

export type AuthState = {
  user: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const TOKEN_KEY = "awl_admin_token";
const USER_KEY = "awl_admin_user";

export function getStoredAuth(): { token: string | null; user: AdminUser | null } {
  if (typeof window === "undefined") return { token: null, user: null };
  const token = localStorage.getItem(TOKEN_KEY);
  const userRaw = localStorage.getItem(USER_KEY);
  const user = userRaw ? (JSON.parse(userRaw) as AdminUser) : null;
  return { token, user };
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function saveAuth(token: string, user: AdminUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const { token, user } = getStoredAuth();
    setState({
      user,
      token,
      isLoading: false,
      isAuthenticated: !!token && !!user,
    });
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await apiClient.post<{ token: string; user: AdminUser }>(
        "/auth/login",
        { email, password }
      );

      const { token, user } = res.data;
      saveAuth(token, user);

      setState({
        token,
        user,
        isLoading: false,
        isAuthenticated: true,
      });

      window.location.href = "/admin";
    },
    []
  );

  const logout = useCallback(() => {
    clearAuth();
    setState({ token: null, user: null, isLoading: false, isAuthenticated: false });
    window.location.href = "/admin/login";
  }, []);

  return { ...state, login, logout };
}
