import { create } from "zustand";
import {
  getToken,
  setToken as saveToken,
  removeToken,
  getUserFromToken,
  type User,
} from "@/lib/auth";
import apiClient from "@/lib/api-client";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  initFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,

  setAuth: (user, token) => {
    saveToken(token);
    localStorage.setItem("op_user", JSON.stringify(user));
    set({ user, token, isLoading: false });
  },

  logout: () => {
    removeToken();
    localStorage.removeItem("op_user");
    set({ user: null, token: null, isLoading: false });
    // Detect current locale from URL
    const locale = window.location.pathname.match(/^\/(ar|en)/)?.[1] || "ar";
    window.location.href = `/${locale}/login`;
  },

  initFromStorage: () => {
    const token = getToken();
    const user = getUserFromToken();
    set({ user, token, isLoading: false });

    // Hydrate fresh user data from the API
    if (token) {
      apiClient
        .get("/auth/me")
        .then((res) => {
          const freshUser = res.data.data;
          localStorage.setItem("op_user", JSON.stringify(freshUser));
          set({ user: freshUser });
        })
        .catch(() => {
          removeToken();
          localStorage.removeItem("op_user");
          set({ user: null, token: null });
        });
    }
  },
}));
